import { Stock } from "../../infrastructure/persistence/mongoose/stock.model";
import type { ClientSession } from "mongoose";

/**
 * InventoryAdapter
 * Exposes supply-chain stock logic to other contexts (like Sales/Order).
 */
export class InventoryAdapter {
    /**
     * Check if a product has enough stock (optionally at a specific outlet).
     */
    async checkAvailability(productId: string, outletId?: string, quantity: number = 1): Promise<boolean> {
        const stock = await Stock.findOne({ product: productId });
        if (!stock) return false;
        
        // Use the model instance method
        return (stock as any).canFulfillOrder(quantity, outletId);
    }

    /**
     * Reserve stock for an order.
     */
    async reserveStock(productId: string, outletId: string, quantity: number, session?: ClientSession): Promise<boolean> {
        // Find stock within the same session
        const stock = await Stock.findOne({ product: productId }).session(session || null);
        if (!stock) return false;

        // Use the model instance method
        const success = (stock as any).reserveStock(quantity, outletId);
        if (success) {
            await (stock as any).save({ session });
        }
        return success;
    }

    /**
     * Release reserved stock (e.g., if order is cancelled before fulfillment).
     */
    async releaseStock(productId: string, outletId: string, quantity: number, session?: ClientSession): Promise<void> {
        const stock = await Stock.findOne({ product: productId }).session(session || null);
        if (stock) {
            (stock as any).releaseStock(quantity, outletId);
            await (stock as any).save({ session });
        }
    }
}

// Export a singleton instance
export const inventoryAdapter = new InventoryAdapter();
