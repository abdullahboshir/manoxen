export interface IOrderContract {
  getOrderById(orderId: string): Promise<any>; // Replace 'any' with a shared DTO if available
  getOrderStatus(orderId: string): Promise<string>;
  updateOrderStatus(orderId: string, status: string): Promise<void>;
}
