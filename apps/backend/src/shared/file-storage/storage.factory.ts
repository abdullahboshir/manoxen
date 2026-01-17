import type { IStorageProvider } from "./interfaces/storage.interface";
import { LocalStorageProvider } from "./providers/local.provider";
import { CloudinaryStorageProvider } from "./providers/cloudinary.provider";
import { S3StorageProvider } from "./providers/s3.provider";
import appConfig from "..//config/app.config";

export class StorageFactory {
    // Simple singleton or factory method
    private static instance: IStorageProvider;

    static getProvider(): IStorageProvider {
        if (this.instance) return this.instance;

        const providerType = appConfig.storage.provider;
        const isProduction = appConfig.NODE_ENV === 'production';

        if (isProduction && providerType === 'local') {
            throw new Error(
                "âŒ CRITICAL SECURITY RISK: Local storage provider is disabled in PRODUCTION. \n" +
                "Please set STORAGE_PROVIDER=s3 or STORAGE_PROVIDER=cloudinary in your .env file."
            );
        }

        switch (providerType) {
            case 'cloudinary':
                this.instance = new CloudinaryStorageProvider();
                break;
            case 's3':
                this.instance = new S3StorageProvider();
                break;
            case 'local':
            default:
                this.instance = new LocalStorageProvider();
                break;
        }
        return this.instance;
    }
}


















