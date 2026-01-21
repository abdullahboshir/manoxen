import { Promotion, type IPromotion } from "#domain/sales/infrastructure/persistence/mongoose/promotion.model.js";
import { 
    QueryBuilder, 
    resolveBusinessUnitId, 
    resolveBusinessUnitQuery,
    AppError 
} from "@manoxen/core-util";
import status from "http-status";

const createPromotion = async (data: Partial<IPromotion>, user: any) => {
    const businessUnitId = await resolveBusinessUnitId((data.businessUnit || user.businessUnit) as any, user);
    
    // Resolve organization if possible
    let organizationId = data.organization;
    if (!organizationId && user.organization) {
        organizationId = user.organization._id || user.organization;
    }

    const promotion = await Promotion.create({ 
        ...data, 
        businessUnit: businessUnitId as any, 
        organization: organizationId as any 
    });
    return promotion;
};

const getAllPromotions = async (query: Record<string, unknown>) => {
    const finalQuery = await resolveBusinessUnitQuery(query);
    const promotionQuery = new QueryBuilder(Promotion.find(finalQuery), query)
        .search(["name", "code"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await promotionQuery.countTotal();
    const result = await promotionQuery.modelQuery;

    return { meta, result };
};

const getPromotionById = async (id: string) => {
    const promotion = await Promotion.findById(id);
    if (!promotion) throw new AppError(status.NOT_FOUND, "Promotion not found");
    return promotion;
};

const getPromotionByCode = async (code: string, businessUnitId: string) => {
    const promotion = await Promotion.findOne({ 
        code: code.toUpperCase(), 
        businessUnit: businessUnitId,
        isActive: true,
        startDate: { $lte: new Date() },
        endDate: { $gte: new Date() }
    });
    return promotion;
};

const updatePromotion = async (id: string, payload: Partial<IPromotion>, user: any) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user) as any;
    }
    const promotion = await Promotion.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!promotion) throw new AppError(status.NOT_FOUND, "Promotion not found");
    return promotion;
};

const deletePromotion = async (id: string) => {
    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) throw new AppError(status.NOT_FOUND, "Promotion not found");
    return promotion;
};

export const PromotionService = {
    createPromotion,
    getAllPromotions,
    getPromotionById,
    getPromotionByCode,
    updatePromotion,
    deletePromotion
};
