import { QueryBuilder, resolveBusinessUnitQuery, resolveBusinessUnitId } from "@manoxen/core-util";
import type { IWarranty } from "../../domain/entities/warranty.entity";
import { Warranty } from "../../infrastructure/persistence/mongoose/warranty.model";

// Note: Organization resolution is handled by backend middleware
// Domain services focus on core business logic

const createWarranty = async (payload: any, user?: any) => {
  // 1. Resolve Business Unit ID first if present
  if (payload.businessUnit) {
    payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user);
  }

  // 2. Auto-detect Organization from user context
  if (!payload.organization && user?.organization) {
    payload.organization = user.organization._id || user.organization;
  }

  const result = await Warranty.create(payload);
  return result;
};

const getAllWarranties = async (query: Record<string, any>) => {
  const finalQuery = await resolveBusinessUnitQuery(query);
  
  const warrantyQuery = new QueryBuilder(
    Warranty.find(),
    finalQuery
  )
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await warrantyQuery.modelQuery;
  const meta = await warrantyQuery.countTotal();

  return { meta, result };
};

const getSingleWarranty = async (id: string) => {
  const result = await Warranty.findById(id);
  return result;
};

const updateWarranty = async (id: string, payload: any, user?: any) => {
  // Resolve BU if changing
  if (payload.businessUnit) {
    payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user);
  }

  const result = await Warranty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteWarranty = async (id: string) => {
  const result = await Warranty.findByIdAndDelete(id);
  return result;
};

export const WarrantyService = {
  createWarranty,
  getAllWarranties,
  getSingleWarranty,
  updateWarranty,
  deleteWarranty,
};
