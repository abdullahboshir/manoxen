// Temporarily disabled - depends on backend modules
export interface IProductContract {
    id: string;
    name: string;
    price: number;
}

export class ProductAdapter {
    constructor(private readonly businessUnitId: string) { }
    async getProduct(_productId: string): Promise<any | null> { return null; }
    private async isEcommerceEnabled(): Promise<boolean> { return false; }
    private async getLocalPOSProduct(_productId: string): Promise<IProductContract | null> {
        // Implementation for local products if business doesn't use Full Ecommerce
        return null;
    }
}




