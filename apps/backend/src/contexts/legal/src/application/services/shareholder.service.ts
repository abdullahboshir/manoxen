import { Shareholder, type IShareholder } from "../../infrastructure/persistence/mongoose/shareholder.model";
import { Types } from "mongoose";

export class ShareholderService {
    /**
     * Create a new shareholder
     */
    static async createShareholder(payload: Partial<IShareholder>) {
        const result = await Shareholder.create(payload);
        return result;
    }

    /**
     * Get all shareholders with optional filters
     */
    static async getAllShareholders(filters: any = {}) {
        const result = await Shareholder.find(filters).populate('user');
        return result;
    }

    /**
     * Update an existing shareholder
     */
    static async updateShareholder(id: string, payload: Partial<IShareholder>) {
        const result = await Shareholder.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        return result;
    }

    /**
     * Remove a shareholder
     */
    static async deleteShareholder(id: string) {
        const result = await Shareholder.findByIdAndDelete(id);
        return result;
    }
}
