import { Blacklist, type IBlacklist } from "#domain/sales/infrastructure/persistence/mongoose/blacklist.model.js";
import { RiskRule, type IRiskRule } from "#domain/sales/infrastructure/persistence/mongoose/risk-rule.model.js";
import { 
    QueryBuilder, 
    resolveBusinessUnitId, 
    resolveBusinessUnitQuery,
    AppError 
} from "@manoxen/core-util";
import status from "http-status";

const createBlacklistEntry = async (data: Partial<IBlacklist>, user: any) => {
    const businessUnitId = await resolveBusinessUnitId((data.businessUnit || user.businessUnit) as any, user);
    const entry = await Blacklist.create([{ ...data, businessUnit: businessUnitId as any, addedBy: user.userId || user._id }]);
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
    if (!entry) throw new AppError(status.NOT_FOUND, "Blacklist entry not found");
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
    if (!entry) throw new AppError(status.NOT_FOUND, "Blacklist entry not found");
    return entry;
};

const deleteBlacklistEntry = async (id: string) => {
    const entry = await Blacklist.findByIdAndDelete(id);
    if (!entry) throw new AppError(status.NOT_FOUND, "Blacklist entry not found");
    return entry;
};

const createRiskRule = async (data: Partial<IRiskRule>, user: any) => {
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
    if (!rule) throw new AppError(status.NOT_FOUND, "Risk Rule not found");
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
    if (!rule) throw new AppError(status.NOT_FOUND, "Risk Rule not found");
    return rule;
};

const deleteRiskRule = async (id: string) => {
    const rule = await RiskRule.findByIdAndDelete(id);
    if (!rule) throw new AppError(status.NOT_FOUND, "Risk Rule not found");
    return rule;
};

const checkFraud = async (data: { phone?: string; email?: string; ip?: string }, user: any) => {
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
