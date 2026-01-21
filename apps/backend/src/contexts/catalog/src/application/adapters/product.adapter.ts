import { Product } from "../../infrastructure/persistence/mongoose/product.model";
import { ProductService } from "../services/product.service";

/**
 * Interface representing the product contract for cross-context use.
 */
export interface IProductContract {
    id: string;
    name: string;
    sku: string;
    barcode?: string;
    price: {
        base: number;
        sale: number;
        currency: string;
    };
    stock: {
        total: number;
        isAvailable: boolean;
    };
    category: {
        id: string;
        name: string;
    };
    images: string[];
    availableModules: string[];
}

export class CatalogProductAdapter {
    private static mapToContract(product: any): IProductContract {
        return {
            id: product._id.toString(),
            name: product.name,
            sku: product.sku,
            barcode: product.barcode,
            price: {
                base: product.pricing?.basePrice || 0,
                sale: product.pricing?.salePrice || 0,
                currency: product.pricing?.currency || "BDT"
            },
            stock: {
                total: product.inventory?.totalStock || 0,
                isAvailable: (product.inventory?.totalStock || 0) > 0
            },
            category: {
                id: product.primaryCategory?._id?.toString() || "",
                name: product.primaryCategory?.name || ""
            },
            images: product.images || [],
            availableModules: product.availableModules || []
        };
    }

    /**
     * Fetch a product by ID and map to contract.
     */
    static async getProductById(id: string): Promise<IProductContract | null> {
        const product = await Product.findById(id)
            .populate('pricing')
            .populate('inventory')
            .populate('primaryCategory')
            .lean();

        if (!product) return null;
        return this.mapToContract(product);
    }

    /**
     * Fetch a product by SKU/Barcode and map to contract.
     */
    static async getProductByIdentity(identifier: string): Promise<IProductContract | null> {
        const product = await Product.findOne({
            $or: [{ sku: identifier }, { barcode: identifier }]
        })
            .populate('pricing')
            .populate('inventory')
            .populate('primaryCategory')
            .lean();

        if (!product) return null;
        return this.mapToContract(product);
    }

    /**
     * Search products based on filter and return contracts.
     */
    static async searchProducts(filter: any, limit: number = 10): Promise<IProductContract[]> {
        const products = await Product.find(filter)
            .populate('pricing')
            .populate('inventory')
            .populate('primaryCategory')
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();

        return products.map((p: any) => this.mapToContract(p));
    }

    /**
     * [Maintenance/Platform Use Only] 
     * Identify and return products marked for deletion before the cutoff date.
     */
    static async getProductsForCleanup(cutoffDate: Date): Promise<any[]> {
        return await Product.find({
            isDeleted: true,
            deletedAt: { $lt: cutoffDate }
        }).lean();
    }

    /**
     * [Maintenance/Platform Use Only]
     * Perform deep deletion of a product.
     */
    static async deepDeleteProduct(productId: string): Promise<void> {
        // Implementation might vary, assuming ProductService has a delete method
        await ProductService.deleteProduct(productId, true);
    }

    /**
     * [Reporting Use Only]
     * Execute stock valuation aggregation.
     */
    static async getStockValuationData(matchStage: any): Promise<any[]> {
        return await Product.aggregate([
            { $match: matchStage },
            {
                $project: {
                    name: 1,
                    sku: 1,
                    stock: "$inventory.stock",
                    costPrice: "$pricing.costPrice",
                    sellingPrice: "$pricing.sellingPrice",
                    totalCostValue: { $multiply: ["$inventory.stock", "$pricing.costPrice"] },
                    totalRetailValue: { $multiply: ["$inventory.stock", "$pricing.sellingPrice"] }
                }
            },
            { $sort: { totalCostValue: -1 } }
        ]);
    }
}
