import { QueryBuilder, resolveBusinessUnitId, resolveBusinessUnitQuery } from "@manoxen/core-util";
import type { ITax } from "../../domain/entities/tax.entity";
import { Tax } from "../../infrastructure/persistence/mongoose/tax.model";

// Note: Organization resolution is handled by backend middleware
// Domain services focus on core business logic

const create = async (payload: ITax, user?: any) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user) as any;
    }

    // Auto-detect Organization from user context
    if (!payload.organization && user?.organization) {
        payload.organization = user.organization._id || user.organization;
    }

    const result = await Tax.create(payload);
    return result;
};

const getAll = async (query: Record<string, unknown> = {}) => {
    const finalQuery = await resolveBusinessUnitQuery(query);

    const taxQuery = new QueryBuilder(
        Tax.find().populate('businessUnit', 'name slug'),
        finalQuery
    )
        .search(['name', 'rate'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await taxQuery.modelQuery;
    const meta = await taxQuery.countTotal();

    return { meta, result };
};

const getById = async (id: string) => {
    const result = await Tax.findById(id);
    return result;
};

const update = async (id: string, payload: Partial<ITax>, user?: any) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user) as any;
    }

    const result = await Tax.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteTax = async (id: string) => {
    const result = await Tax.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
};

export const TaxService = {
    create,
    getAll,
    getById,
    update,
    delete: deleteTax,
};
