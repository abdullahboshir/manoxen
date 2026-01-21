import { Product } from "../../infrastructure/persistence/mongoose/product.model";

export const generateProductCode = async (categoryName: string, origin: string | undefined = 'BD'): Promise<string> => {
  const prefix = (categoryName.substring(0, 3).toUpperCase() + '-' + origin.substring(0, 2).toUpperCase()).replace(/ /g, '');
  
  const lastProduct = await Product.findOne({ sku: new RegExp('^' + prefix) })
    .sort({ createdAt: -1 })
    .select('sku');

  let nextNumber = 1001;
  if (lastProduct && lastProduct.sku) {
    const parts: any = lastProduct.sku.split('-');
    if (!parts || parts.length === 0) {
      throw new Error("Invalid product SKU format");
    }
    const lastNum = parseInt(parts[parts.length - 1]);
    if (!isNaN(lastNum)) {
      nextNumber = lastNum + 1;
    }
  }

  return `${prefix}-${nextNumber}`;
};
