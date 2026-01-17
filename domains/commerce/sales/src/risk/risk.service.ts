import { Blacklist, type IBlacklist } from "./blacklist.model";
import { RiskRule, type IRiskRule } from "./risk-rule.model";
import { 
    QueryBuilder, 
    resolveBusinessUnitId, 
    resolveBusinessUnitQuery,
    AppError 
} from "@manoxen/core-util";
import httpStatus from "http-status";

// Note: Organization resolution is handled by backend middleware
// Domain services focus on core business logic

// ==================== BLACKLIST FUNCTIONS ====================

const createBlacklistEntry = async (data: IBlacklist, user: any) => {
    const businessUnitId = await resolveBusinessUnitId((data.businessUnit || user.businessUnit) as any, user);
    const entry = await Blacklist.create([{ ...data, businessUnit: businessUnitId as any, addedBy: user.userId }]);
    return entry[0];
};

const getAllBlacklistEntries = async (query: Record<string, unknown>) => {
    const finalQuery = await resolveBusinessUnitQuery(query);
    const blacklistQuery = new QueryBuilder(Blacklist.find(finalQuery), query)
        .search(["identifier", "reason"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await blacklistQuery.countTotal();
    const result = await blacklistQuery.modelQuery;

    return { meta, result };
};

const getBlacklistEntryById = async (id: string) => {
    const entry = await Blacklist.findById(id);
    if (!entry) throw new AppError(httpStatus.NOT_FOUND, "Blacklist entry not found");
    return entry;
};

const updateBlacklistEntry = async (id: string, payload: Partial<IBlacklist>, user: any) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user) as any;
    }
    const entry = await Blacklist.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!entry) throw new AppError(httpStatus.NOT_FOUND, "Blacklist entry not found");
    return entry;
};

const deleteBlacklistEntry = async (id: string) => {
    const entry = await Blacklist.findByIdAndDelete(id);
    if (!entry) throw new AppError(httpStatus.NOT_FOUND, "Blacklist entry not found");
    return entry;
};

// ==================== RISK RULE FUNCTIONS ====================

const createRiskRule = async (data: IRiskRule, user: any) => {
    const businessUnitId = await resolveBusinessUnitId((data.businessUnit || user.businessUnit) as any, user);
    const rule = await RiskRule.create({ ...data, businessUnit: businessUnitId as any });
    return rule;
};

const getAllRiskRules = async (query: Record<string, unknown>) => {
    const finalQuery = await resolveBusinessUnitQuery(query);
    const riskRulesQuery = new QueryBuilder(RiskRule.find(finalQuery), query)
        .search(["name"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await riskRulesQuery.countTotal();
    const result = await riskRulesQuery.modelQuery;

    return { meta, result };
};

const getRiskRuleById = async (id: string) => {
    const rule = await RiskRule.findById(id);
    if (!rule) throw new AppError(httpStatus.NOT_FOUND, "Risk Rule not found");
    return rule;
};

const updateRiskRule = async (id: string, payload: Partial<IRiskRule>, user: any) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any, user) as any;
    }
    const rule = await RiskRule.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!rule) throw new AppError(httpStatus.NOT_FOUND, "Risk Rule not found");
    return rule;
};

const deleteRiskRule = async (id: string) => {
    const rule = await RiskRule.findByIdAndDelete(id);
    if (!rule) throw new AppError(httpStatus.NOT_FOUND, "Risk Rule not found");
    return rule;
};

// ==================== CORE FRAUD CHECK ====================

const checkFraud = async (data: { phone?: string; email?: string; ip?: string }, user: any) => {
    // 1. Check Local Blacklist
    const buQuery: any = {};
    if (user.businessUnit) {
        buQuery.businessUnit = user.businessUnit._id || user.businessUnit;
    }

    const query: any = {
        ...buQuery,
        isActive: true,
        $or: [] as any[]
    };

    if (data.phone) query.$or.push({ identifier: data.phone, type: "phone" });
    if (data.email) query.$or.push({ identifier: data.email, type: "email" });
    if (data.ip) query.$or.push({ identifier: data.ip, type: "ip" });

    if (query.$or.length === 0) return { status: "clean", riskScore: 0, messages: [] };

    const blacklistMatches = await Blacklist.find(query);
    if (blacklistMatches.length > 0) {
        return {
            status: "blocked",
            riskScore: 100,
            matches: blacklistMatches,
            message: "Customer found in local blacklist"
        };
    }

    // 2. Courier API logic would go here (abstracted from domain if possible)
    
    return {
        status: "clean",
        riskScore: 0,
        message: "No risk detected in local databases"
    };
};

export const RiskService = {
    createBlacklistEntry,
    getAllBlacklistEntries,
    getBlacklistEntryById,
    updateBlacklistEntry,
    deleteBlacklistEntry,

    createRiskRule,
    getAllRiskRules,
    getRiskRuleById,
    updateRiskRule,
    deleteRiskRule,

    checkFraud
};
