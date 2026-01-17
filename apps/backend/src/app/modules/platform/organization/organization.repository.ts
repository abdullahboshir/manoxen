import { Organization } from "./organization.model";
import type { IOrganizationDocument } from "./organization.interface";
import { type ClientSession } from 'mongoose';

export class OrganizationRepository {
    async create(data: Partial<IOrganizationDocument>, session: ClientSession | null = null): Promise<IOrganizationDocument> {
        if (session) {
            const [organization] = await Organization.create([data], { session });
            if (!organization) throw new Error("Failed to create organization");
            return organization as IOrganizationDocument;
        }
        return await Organization.create(data);
    }

    async findAll(filter: Record<string, any> = {}): Promise<IOrganizationDocument[]> {
        return await Organization.find(filter);
    }

    async findById(id: string): Promise<IOrganizationDocument | null> {
        return await Organization.findById(id);
    }

    async update(id: string, data: Partial<IOrganizationDocument>): Promise<IOrganizationDocument | null> {
        return await Organization.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<IOrganizationDocument | null> {
        return await Organization.findByIdAndDelete(id);
    }
}
















