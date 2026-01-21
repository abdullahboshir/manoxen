export interface IProfitLossFilters {
    startDate: string;
    endDate: string;
    businessUnit?: string;
    outlet?: string;
}

export interface IProfitLossStatement {
    revenue: number;
    cogs: number;
    grossProfit: number;
    expenses: number;
    netProfit: number;
    expenseBreakdown: Array<{
        category: string;
        amount: number;
    }>;
}
