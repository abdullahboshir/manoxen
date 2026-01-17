import { IBrand } from "./brand.interface";
import { Brand } from "./brand.model";
import { QueryBuilder, resolveBusinessUnitQuery, resolveBusinessUnitId } from "@manoxen/core-util";

// Note: BusinessUnit lookup for organization is handled by backend middleware
// Domain services focus on core business logic only

const createBrand = async (payload: IBrand, user?: any) => {
    // Resolve Business Unit ID if present
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any) as any;
    }

    // Auto-detect Organization from user context
    if (!payload.organization && user?.organization) {
        payload.organization = user.organization._id || user.organization;
    }

    const result = await Brand.create(payload);
    return result;
};

const getAllBrands = async (query: any) => {
    const finalQuery = await resolveBusinessUnitQuery(query);

    const brandQuery = new QueryBuilder(Brand.find().populate('businessUnit', 'name slug'), finalQuery)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await brandQuery.modelQuery;
    const meta = await brandQuery.countTotal();

    return { meta, result };
};

const getBrandById = async (id: string) => {
    const result = await Brand.findById(id);
    return result;
};

const updateBrand = async (id: string, payload: Partial<IBrand>) => {
    const result = await Brand.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteBrand = async (id: string) => {
    const result = await Brand.findByIdAndDelete(id);
    return result;
};

export const BrandService = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
};
