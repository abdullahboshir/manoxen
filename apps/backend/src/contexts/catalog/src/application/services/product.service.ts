import mongoose, { startSession, Types } from "mongoose";
import status from "http-status";
import { AppError, QueryBuilder, resolveBusinessUnitId, resolveBusinessUnitQuery, CacheManager } from "@manoxen/core-util";
import { Product } from "../../infrastructure/persistence/mongoose/product.model";
import { Category as CategoryModel } from "../../infrastructure/persistence/mongoose/category.model";
import { ProductVariant } from "../../infrastructure/persistence/mongoose/features/product-variant/product-variant.model";
import { ProductDetails } from "../../infrastructure/persistence/mongoose/features/product-details/product-details.model";
import { ProductShipping } from "../../infrastructure/persistence/mongoose/features/product-shipping/product-shipping.model";
import { ProductWarrantyReturn } from "../../infrastructure/persistence/mongoose/features/product-warranty-return/product-warranty-return.model";
import { Stock } from "@manoxen/supply";
import { ProductPricing } from "../../infrastructure/persistence/mongoose/features/product-pricing/product-pricing.model";
import { generateProductCode } from "../utils/product.utils";

const mapFrontendToBackendVariant = (frontendVariant: any, parentId: string, parentSku: string) => {
  const attributesMap: any = {};
  if (Array.isArray(frontendVariant.options)) {
    frontendVariant.options.forEach((opt: any) => {
      if (opt.name && opt.value) {
        attributesMap[opt.name] = opt.value;
      }
    });
  }

  return {
    variantId: frontendVariant.id || new Types.ObjectId().toString(),
    parentProduct: parentId,
    sku: frontendVariant.sku || `${parentSku}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    attributes: attributesMap,
    pricing: {
      basePrice: frontendVariant.price || 0,
      salePrice: frontendVariant.price || 0,
      costPrice: 0,
      currency: "BDT"
    },
    inventory: {
      stock: frontendVariant.stock || 0,
      allowBackorder: false
    },
    images: frontendVariant.images && Array.isArray(frontendVariant.images) ? frontendVariant.images : (frontendVariant.image ? [frontendVariant.image] : []),
    physicalProperties: frontendVariant.physicalProperties || {
      weight: frontendVariant.weight || 0,
      weightUnit: frontendVariant.weightUnit || "kg",
      dimensions: frontendVariant.dimensions || {
        length: frontendVariant.length || 0,
        width: frontendVariant.width || 0,
        height: frontendVariant.height || 0,
        unit: frontendVariant.dimensionUnit || frontendVariant.unit || "cm"
      }
    },
    isDefault: frontendVariant.isDefault || false,
    status: "active"
  };
};

export const createProductService = async (payload: any, user?: any) => {
  const session = await startSession();
  session.startTransaction();

  try {
    if (payload.businessUnit) {
      payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit, user);
    }

    if (!payload.organization) {
        if (payload.businessUnit) {
             const BusinessUnitModel = mongoose.models['BusinessUnit'] || mongoose.model('BusinessUnit');
             const bu = await BusinessUnitModel.findById(payload.businessUnit).select('company');
             if (bu && bu.company) {
                 payload.organization = bu.company;
             }
        }
        if (!payload.organization && user?.organization) {
            payload.organization = user.organization._id || user.organization;
        }
    }

    const category = await CategoryModel.findById(payload?.primaryCategory || payload?.categories?.[0]);
    if (!category) {
      throw new AppError(status.NOT_FOUND, 'Category not found!');
    }

    const productSku = await generateProductCode(category?.name ? category?.name : 'others', payload?.origine);
    const productId = new Types.ObjectId();

    const pricing = await ProductPricing.create([{ ...payload.pricing, product: productId, organization: payload.organization, businessUnit: payload.businessUnit }], { session });
    const inventory = await Stock.create([{ ...payload.inventory, product: productId, organization: payload.organization, businessUnit: payload.businessUnit }], { session });
    const details = await ProductDetails.create([{ ...payload.details, product: productId, organization: payload.organization, businessUnit: payload.businessUnit }], { session });
    const shipping = await ProductShipping.create([{ ...payload.shipping, product: productId, organization: payload.organization, businessUnit: payload.businessUnit }], { session });
    const warranty = await ProductWarrantyReturn.create([{ ...payload.warranty, product: productId, organization: payload.organization, businessUnit: payload.businessUnit }], { session });

    let variantTemplateId = undefined;
    if (payload.hasVariants) {
      const mappedVariants = (payload.variants || []).map((v: any) =>
        mapFrontendToBackendVariant(v, productId.toString(), productSku)
      );

      const variantData = {
        product: productId,
        hasVariants: true,
        variants: mappedVariants,
        variantAttributes: payload.variantAttributes || [],
        organization: payload.organization,
        businessUnit: payload.businessUnit
      };

      const productVariant = await ProductVariant.create([variantData], { session });
      variantTemplateId = productVariant[0]?._id;
    }

    const productPayload = {
      ...payload,
      _id: productId,
      sku: productSku,
      pricing: pricing[0]?._id,
      inventory: inventory[0]?._id,
      details: details[0]?._id,
      shipping: shipping[0]?._id,
      warranty: warranty[0]?._id,
      variantTemplate: variantTemplateId
    };

    const product = await Product.create([productPayload], { session });

    await session.commitTransaction();
    session.endSession();

    return product[0];

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

export const getAllProductsService = async (query: any) => {
  const finalQuery = await resolveBusinessUnitQuery(query);
  const cacheKey = `product:list:${JSON.stringify(finalQuery)}`;

  return await CacheManager.wrap(cacheKey, async () => {
    const productQuery = new QueryBuilder(
      Product.find()
        .populate('primaryCategory')
        .populate('brands')
        .populate('pricing')
        .populate('inventory'),
      finalQuery
    )
      .search(['name', 'sku'])
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal();

    return {
      meta,
      result
    };
  }, 60);
}

export const getProductByIdService = async (id: string) => {
  return await CacheManager.wrap(`product:id:${id}`, async () => {
    return await Product.findById(id)
        .populate('primaryCategory')
        .populate('brands')
        .populate('pricing')
        .populate('inventory')
        .populate('details')
        .populate('shipping')
        .populate('warranty')
        .populate('variantTemplate');
  }, 300);
}

export const updateProductService = async (id: string, payload: any, user?: any) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError(status.NOT_FOUND, "Product not found");
    }

    if (payload.businessUnit) {
      payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit, user);
    }

    if (payload.pricing && product.pricing) {
      await ProductPricing.findByIdAndUpdate(product.pricing, payload.pricing, { session });
    }

    if (payload.inventory && product.inventory) {
      await Stock.findByIdAndUpdate(product.inventory, payload.inventory, { session });
    }

    if (payload.details && product.details) {
      await ProductDetails.findByIdAndUpdate(product.details, payload.details, { session });
    }

    if (payload.shipping && product.shipping) {
      await ProductShipping.findByIdAndUpdate(product.shipping, payload.shipping, { session });
    }

    if (payload.warranty && product.warranty) {
      await ProductWarrantyReturn.findByIdAndUpdate(product.warranty, payload.warranty, { session });
    }

    if (payload.hasVariants !== undefined || payload.variants) {
      const mappedVariants = (payload.variants || []).map((v: any) =>
        mapFrontendToBackendVariant(v, id, product.sku)
      );

      if (product.variantTemplate) {
        const variantUpdatePayload: any = {};
        if (payload.variants) {
          variantUpdatePayload.variants = mappedVariants;
        }
        if (payload.variantAttributes) {
          variantUpdatePayload.variantAttributes = payload.variantAttributes;
        }
        await ProductVariant.findByIdAndUpdate(product.variantTemplate, variantUpdatePayload, { session });
      } else if (payload.hasVariants && payload.variants) {
        const variantData = {
          product: id,
          hasVariants: true,
          variants: mappedVariants,
          variantAttributes: payload.variantAttributes || [],
          organization: product.organization,
          businessUnit: product.businessUnit
        };
        const newVariant = await ProductVariant.create([variantData], { session });
        payload.variantTemplate = newVariant[0]?._id;
      }
    }

    const { pricing, inventory, details, shipping, warranty, variants, variantAttributes, ...productData } = payload;
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true, session });

    await session.commitTransaction();
    session.endSession();

    await CacheManager.del(`product:id:${id}`);
    return updatedProduct;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

export const deleteProductService = async (id: string, force: boolean = false) => {
  if (!force) {
    const product = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!product) {
      throw new AppError(status.NOT_FOUND, "Product not found");
    }
    await CacheManager.del(`product:id:${id}`);
    return { message: "Product moved to trash (Soft Delete)" };
  }

  const session = await startSession();
  session.startTransaction();
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError(status.NOT_FOUND, "Product not found");
    }

    if (product.pricing) await ProductPricing.findByIdAndDelete(product.pricing, { session });
    if (product.inventory) await Stock.findByIdAndDelete(product.inventory, { session });
    if (product.details) await ProductDetails.findByIdAndDelete(product.details, { session });
    if (product.shipping) await ProductShipping.findByIdAndDelete(product.shipping, { session });
    if (product.warranty) await ProductWarrantyReturn.findByIdAndDelete(product.warranty, { session });
    if (product.variantTemplate) await ProductVariant.findByIdAndDelete(product.variantTemplate, { session });

    await Product.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    session.endSession();

    await CacheManager.del(`product:id:${id}`);
    return { message: "Product permanently deleted" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
export const ProductService = {
    createProduct: createProductService,
    getAllProducts: getAllProductsService,
    getProductById: getProductByIdService,
    updateProduct: updateProductService,
    deleteProduct: deleteProductService
};
