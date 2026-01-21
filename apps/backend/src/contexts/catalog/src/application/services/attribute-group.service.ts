import type { IAttributeGroup } from "../../domain/entities/attribute-group.entity";
import { AttributeGroup } from "../../infrastructure/persistence/mongoose/attribute-group.model";
import { QueryBuilder, resolveBusinessUnitQuery, resolveBusinessUnitId } from "@manoxen/core-util";

const createAttributeGroup = async (payload: IAttributeGroup, user?: any) => {
    // Resolve Business Unit ID if present
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any) as any;
    }

    // Auto-detect Organization from user context
    if (!payload.organization && user?.organization) {
        payload.organization = user.organization._id || user.organization;
    }

    const result = await AttributeGroup.create(payload);
    return result;
};

const getAllAttributeGroups = async (query: any) => {
    const finalQuery = await resolveBusinessUnitQuery(query);

    const attributeGroupQuery = new QueryBuilder(AttributeGroup.find().populate('businessUnit', 'name slug'), finalQuery)
        .search(['name', 'code'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await attributeGroupQuery.modelQuery;
    const meta = await attributeGroupQuery.countTotal();

    return { meta, result };
};

const getAttributeGroupById = async (id: string) => {
    const result = await AttributeGroup.findById(id);
    return result;
};

const updateAttributeGroup = async (id: string, payload: Partial<IAttributeGroup>) => {
    const result = await AttributeGroup.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteAttributeGroup = async (id: string) => {
    const result = await AttributeGroup.findByIdAndDelete(id);
    return result;
};

export const AttributeGroupService = {
    createAttributeGroup,
    getAllAttributeGroups,
    getAttributeGroupById,
    updateAttributeGroup,
    deleteAttributeGroup,
};
