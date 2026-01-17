import mongoose from 'mongoose';
import { connectDB } from "./connection";
import { log as logger } from '@manoxen/core-util';

export class ConnectionManager {
    static async initDefaultConnection(): Promise<any> {
        console.log("ðŸ”„ Initializing default database connection...");
        await connectDB();
        console.log("âœ… Default connection initialized");
        return mongoose.connection;
    }
    static getDefaultConnection(): any { return null; }
    static async getConnection(tenantId: string, databaseUri: string): Promise<any> { 
        logger.debug(`[ConnectionManager] Resolving connection for tenant ${tenantId}`);
        return mongoose.connection; // For now, return default connection or implement pool
    }
    static async closeConnection(): Promise<void> {}
    static async cleanupIdleConnections(): Promise<void> {}
    static async shutdown(): Promise<void> {}
    static getPoolStats(): any { return {}; }
}

export default ConnectionManager;
















