export interface IInventoryContract {
  checkStock(productId: string, quantity: number): Promise<boolean>;
  reserveStock(orderId: string, items: Array<{ productId: string; quantity: number }>): Promise<boolean>;
  releaseStock(orderId: string): Promise<boolean>;
  adjustStock(productId: string, quantity: number, type: 'increment' | 'decrement', reason: string): Promise<void>;
}
