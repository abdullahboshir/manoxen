export interface IAsset {
    id?: string;
    name: string;
    code: string;
    category: string;
    serialNumber?: string;
    purchaseDate?: Date;
    purchaseCost?: number;
    currentLocation?: string;
    assignedTo?: string; // Staff ID
    condition: 'new' | 'good' | 'fair' | 'poor' | 'broken';
    status: 'available' | 'assigned' | 'under-repair' | 'disposed';
    organization: string;
    businessUnit: string;
}
