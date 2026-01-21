
import { Media } from '#domain/system/infrastructure/persistence/mongoose/media.model.js';
import { AppError } from '@manoxen/core-util';
import status from 'http-status';

export class MediaService {
    /**
     * Register a new media asset
     */
    static async registerMedia(data: any, user: any) {
        const organizationId = user.organization;
        const businessUnitId = user.businessUnit;
        
        const media = await Media.create({
            ...data,
            organizationId,
            businessUnitId,
            uploadedBy: user._id
        });
        
        return media;
    }

    /**
     * Get media assets for a business unit
     */
    static async getMediaLibrary(user: any, filter: any = {}) {
        const query = { businessUnitId: user.businessUnit, ...filter };
        return Media.find(query).sort({ createdAt: -1 });
    }

    /**
     * Get media by ID
     */
    static async getMediaById(id: string, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const media = await Media.findOne(query);
        
        if (!media) {
            throw new AppError(status.NOT_FOUND, 'Media not found');
        }
        
        return media;
    }

    /**
     * Update media metadata
     */
    static async updateMediaMetadata(id: string, data: any, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const media = await Media.findOneAndUpdate(query, { $set: data }, { new: true });
        
        if (!media) {
            throw new AppError(status.NOT_FOUND, 'Media not found');
        }
        
        return media;
    }

    /**
     * Delete media registration
     */
    static async deleteMedia(id: string, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const media = await Media.findOneAndDelete(query);
        
        if (!media) {
            throw new AppError(status.NOT_FOUND, 'Media not found');
        }
        
        // Note: Actual file deletion from storage should be handled here or via event listeners
        return media;
    }
}
