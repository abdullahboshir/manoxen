import { BusinessUnit, type IBusinessUnitCoreDocument } from "./business-unit.model";


export class BusinessUnitRepository {
    async create(data: Partial<IBusinessUnitCoreDocument>): Promise<IBusinessUnitCoreDocument> {
        return await BusinessUnit.create(data);
    }

    async findAll(): Promise<IBusinessUnitCoreDocument[]> {
        return await BusinessUnit.find();
    }

    async findById(id: string): Promise<IBusinessUnitCoreDocument | null> {
        return await BusinessUnit.findById(id);
    }

    async update(id: string, data: Partial<IBusinessUnitCoreDocument>): Promise<IBusinessUnitCoreDocument | null> {
        return await BusinessUnit.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<IBusinessUnitCoreDocument | null> {
        return await BusinessUnit.findByIdAndDelete(id);
    }

    async findBySlug(slug: string): Promise<IBusinessUnitCoreDocument | null> {
        return await BusinessUnit.findOne({ slug });
    }
}
