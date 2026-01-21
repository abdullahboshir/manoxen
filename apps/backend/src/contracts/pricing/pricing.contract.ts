export interface IPricingContract {
  calculatePrice(productId: string, quantity: number, customerId?: string): Promise<{
    unitPrice: number;
    totalPrice: number;
    currency: string;
    discount?: number;
    tax?: number;
  }>;
  getProductPrice(productId: string): Promise<{ price: number; currency: string }>;
}
