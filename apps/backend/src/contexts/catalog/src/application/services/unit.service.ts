import type { IUnit } from "../../domain/entities/unit.entity";
import { Unit } from "../../infrastructure/persistence/mongoose/unit.model";
import { QueryBuilder, resolveBusinessUnitQuery, resolveBusinessUnitId } from "@manoxen/core-util";

// Note: Organization resolution is handled by backend middleware
// Domain services focus on core business logic

const createUnit = async (payload: IUnit, user?: any) => {
    // Resolve BU if needed
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user) as any;
    }

    // Auto-detect Organization from user context
    if (!payload.organization && user?.organization) {
        payload.organization = user.organization._id || user.organization;
    }

    const result = await Unit.create(payload);
    return result;
};

const getAllUnits = async (query: Record<string, unknown> = {}) => {
    const finalQuery = await resolveBusinessUnitQuery(query);

    const unitQuery = new QueryBuilder(Unit.find().populate('businessUnit'), finalQuery)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await unitQuery.modelQuery;
    const meta = await unitQuery.countTotal();

    return { meta, result };
};

const getUnitById = async (id: string) => {
    const result = await Unit.findById(id).populate('businessUnit');
    return result;
};

const updateUnit = async (id: string, payload: Partial<IUnit>, user?: any) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user) as any;
    }

    const result = await Unit.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteUnit = async (id: string) => {
    const result = await Unit.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
};

export const UnitService = {
    createUnit,
    getAllUnits,
    getUnitById,
    updateUnit,
    deleteUnit,
};
