export interface ICatalogProductContract {
    id: string;
    sku: string;
    name: string;
    basePrice: number;
    taxRate: number;
    currency: string;
    unit: string;
}

export interface ICatalogServiceContract {
    getProductBySku(sku: string): Promise<ICatalogProductContract | null>;
    getProductById(id: string): Promise<ICatalogProductContract | null>;
}
