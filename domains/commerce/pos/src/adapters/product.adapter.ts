// Temporarily disabled - depends on backend modules
export class ProductAdapter {
    constructor(private readonly businessUnitId: string) { }
    async getProduct(_productId: string): Promise<any | null> { return null; }
    private async isEcommerceEnabled(): Promise<boolean> { return false; }
    private getLocalPOSProduct(_productId: string): any { return null; }
}
    }

    private async getLocalPOSProduct(_productId: string): Promise<IProductContract | null> {
        // Implementation for local products if business doesn't use Full Ecommerce
        return null;
    }
}




