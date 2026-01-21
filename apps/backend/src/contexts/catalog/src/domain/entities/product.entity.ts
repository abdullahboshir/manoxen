import type { IProductCore as IBaseProductCore } from "@manoxen/shared-types";

export interface IProduct extends IBaseProductCore {
    unit?: string;
    organization: string;
    outlet: string;
    businessUnit: string;
    vendor: {
        id: string;
        name: string;
        rating: number;
        isVerified: boolean;
    };
    categories: string[];
    primaryCategory: string;
    crossSellProducts?: string[];
    upsellProducts?: string[];
    brands: string[];
    pricing: string;
    inventory: string;
    shipping: string;
    warranty: string;
    details: string;
    variantTemplate?: string;
    statusInfo: IBaseProductCore['statusInfo'] & {
        reviewedBy?: string;
    };
}
