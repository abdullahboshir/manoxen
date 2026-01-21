import { ProductPricing } from "../../infrastructure/persistence/mongoose/pricing.model";
import type { IProductPricing } from "../../domain/entities/pricing.entity";
import { AppError } from "@manoxen/core-util";

export class PricingService {
  async createPricing(data: Partial<IProductPricing>) {
    const pricing = await ProductPricing.create(data);
    return pricing;
  }

  async updatePricing(productId: string, data: Partial<IProductPricing>) {
    const pricing = await ProductPricing.findOneAndUpdate(
      { product: productId },
      { $set: data },
      { new: true, upsert: true }
    );
    if (!pricing) {
      throw new AppError(404, "Pricing not found for this product");
    }
    return pricing;
  }

  async getPricingByProduct(productId: string) {
    const pricing = await ProductPricing.findOne({ product: productId });
    if (!pricing) {
      throw new AppError(404, "Pricing not found for this product");
    }
    return pricing;
  }

  async calculateFinalPrice(productId: string, quantity: number = 1) {
    const pricing = await this.getPricingByProduct(productId);
    return {
      finalPrice: pricing.calculateFinalPrice(quantity),
      tax: pricing.calculateTax(quantity),
      commission: pricing.calculateCommission(quantity),
      currency: pricing.currency
    };
  }
}

export const pricingService = new PricingService();
