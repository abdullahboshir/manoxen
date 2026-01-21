import { Model, Document } from "mongoose";
import type { 
    ISharedGatewayGovernance, 
    ISharedInfrastructureHub, 
    ISharedInternationalizationHub, 
    ISharedModuleMap, 
    ISharedObservability, 
    ISharedStorageRegistry, 
    ISharedSystemCore 
} from "@manoxen/organization";

export interface ISystemSettings {
    softDeleteRetentionDays: number;
    isRetentionPolicyEnabled: boolean;
    licenseKey?: string;
    enabledModules: ISharedModuleMap;
    core: ISharedSystemCore;
    observability: ISharedObservability;
    infrastructureHub: ISharedInfrastructureHub;
    storageRegistry: ISharedStorageRegistry;
    gatewayGovernance: ISharedGatewayGovernance;
    internationalizationHub: ISharedInternationalizationHub;
}

export interface ISystemSettingsDocument extends ISystemSettings, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface ISystemSettingsModel extends Model<ISystemSettingsDocument> {
    getSettings(session?: any): Promise<ISystemSettingsDocument>;
}
