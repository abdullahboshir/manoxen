import type { IAttribute } from "./attribute.interface";
import { Attribute } from "./attribute.model";
import { QueryBuilder, resolveBusinessUnitQuery, resolveBusinessUnitId } from "@manoxen/core-util";

const createAttribute = async (payload: IAttribute, user?: any) => {
    // Resolve Business Unit ID if present
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any) as any;
    }

    // Auto-detect Organization from user context
    if (!payload.organization && user?.organization) {
        payload.organization = user.organization._id || user.organization;
    }

    const result = await Attribute.create(payload);
    return result;
};

const getAllAttributes = async (query: any) => {
    const finalQuery = await resolveBusinessUnitQuery(query);

    const attributeQuery = new QueryBuilder(Attribute.find().populate('businessUnit', 'name slug'), finalQuery)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await attributeQuery.modelQuery;
    const meta = await attributeQuery.countTotal();

    return { meta, result };
};

const getAttributeById = async (id: string) => {
    const result = await Attribute.findById(id);
    return result;
};

const updateAttribute = async (id: string, payload: Partial<IAttribute>) => {
    const result = await Attribute.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteAttribute = async (id: string) => {
    const result = await Attribute.findByIdAndDelete(id);
    return result;
};

export const AttributeService = {
    createAttribute,
    getAllAttributes,
    getAttributeById,
    updateAttribute,
    deleteAttribute,
};
