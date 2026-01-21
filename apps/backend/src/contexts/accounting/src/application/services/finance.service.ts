import { BusinessUnitFinance } from "@manoxen/organization";
import { AppError, QueryBuilder, resolveBusinessUnitId, resolveBusinessUnitQuery } from "@manoxen/core-util";
import status from "http-status";

const createPayout = async (payload: { businessUnitId: string; amount: number; method: string }, user: any) => {
    const buId = await resolveBusinessUnitId(payload.businessUnitId, user);
    const finance = await BusinessUnitFinance.findOne({ businessUnit: buId });
    
    if (!finance) {
        throw new AppError(status.NOT_FOUND, "Financial record not found for this Business Unit");
    }

    const success = await finance.processPayout(payload.amount, payload.method);
    if (!success) {
        throw new AppError(status.BAD_REQUEST, "Insufficient funds or invalid payout request");
    }

    return finance;
};

const getFinanceSummary = async (businessUnitId: string, user: any) => {
    const buId = await resolveBusinessUnitId(businessUnitId, user);
    const finance = await BusinessUnitFinance.findOne({ businessUnit: buId });
    
    if (!finance) {
        throw new AppError(status.NOT_FOUND, "Financial record not found");
    }

    return finance;
};

const reconcileTransactions = async (businessUnitId: string, user: any) => {
    const buId = await resolveBusinessUnitId(businessUnitId, user);
    const finance = await BusinessUnitFinance.findOne({ businessUnit: buId });
    
    if (!finance) {
        throw new AppError(status.NOT_FOUND, "Financial record not found");
    }

    await finance.reconcileTransactions();
    return finance;
};

const getAllPayouts = async (query: any) => {
    // This assumes we want to filter payouts across all BU Finance records
    // For now, let's just use QueryBuilder on BusinessUnitFinance
    const finalQuery = await resolveBusinessUnitQuery(query);
    const apiQuery = new QueryBuilder(BusinessUnitFinance.find(finalQuery), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await apiQuery.modelQuery;
    const meta = await apiQuery.countTotal();

    // Extracting only payouts would require more complex aggregation
    return { meta, result };
};

export const FinanceService = {
    createPayout,
    getFinanceSummary,
    reconcileTransactions,
    getAllPayouts
};
