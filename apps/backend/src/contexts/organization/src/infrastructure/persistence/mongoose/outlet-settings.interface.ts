import type { Document, Model, Types } from "mongoose";
import type { 
    ISharedBranding, ISharedPOSHardware, ISharedCompliance, 
    ISharedOperatingHours, ISharedPaymentSettings, ISharedServiceArea, 
    ISharedCashierRegistry, ISharedIntegrationRegistry, ISharedLegalGovernance, 
    ISharedSmtpConfig, ISharedPrefixPolicy, ISharedTaxIntelligence, 
    ISharedDisplayPolicy, ISharedCheckoutPolicy, ISharedInventoryPolicy, 
    ISharedPricingPolicy, ISharedFulfillmentPolicy, ISharedCommunicationChannel, 
    ISharedSEOPolicy 
} from "../../../shared/common.interface.js";

export interface IOutletSettings {
    outlet: Types.ObjectId;
    branding: ISharedBranding;
    pos: ISharedPOSHardware;
    compliance: ISharedCompliance;
    operatingHours: ISharedOperatingHours;
    payment: ISharedPaymentSettings;
    serviceArea: ISharedServiceArea;
    cashier: ISharedCashierRegistry;
    integrations: ISharedIntegrationRegistry[];
    legal: ISharedLegalGovernance;
    smtp: ISharedSmtpConfig;
    prefixes: ISharedPrefixPolicy;
    taxIntelligence: ISharedTaxIntelligence;
    contact: {
        email: string;
        phone?: string;
        website?: string;
        socialMedia: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
            youtube?: string;
            linkedin?: string;
        };
    };
    display: ISharedDisplayPolicy;
    checkout: ISharedCheckoutPolicy;
    inventory: ISharedInventoryPolicy;
    pricingPolicy: ISharedPricingPolicy;
    fulfillmentPolicy: ISharedFulfillmentPolicy;
    communication: ISharedCommunicationChannel;
    seo: ISharedSEOPolicy;
    createdAt: Date;
    updatedAt: Date;
}

export type IOutletSettingsDocument = IOutletSettings & Document;

export interface IOutletSettingsModel extends Model<IOutletSettingsDocument> {
    getSettings(outletId: Types.ObjectId, session?: any): Promise<IOutletSettingsDocument>;
}
