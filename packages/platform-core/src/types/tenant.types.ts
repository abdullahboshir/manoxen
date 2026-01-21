export interface ITenantStorageConfig {
    provider: 'local' | 's3' | 'cloudinary';
    basePath?: string;
    cdnUrl?: string;
    bucket?: string;
    region?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    cloudName?: string;
    apiKey?: string;
    apiSecret?: string;
}

export interface ITenantContext {
    organizationId: string;
    organizationSlug: string;
    deploymentType: 'shared' | 'dedicated';
    storageConfig?: ITenantStorageConfig;
}
