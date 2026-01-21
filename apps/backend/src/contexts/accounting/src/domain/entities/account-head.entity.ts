import { Schema } from "mongoose";

export interface IAccountHead {
    name: string; // "Cash on Hand", "Bank Asia"
    code: string; // "1001", "1002"
    type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
    parentAccount?: Schema.Types.ObjectId;

    // Module: 'pos' (Cash Drawer mapping), 'erp' (General Ledger)
    module: 'pos' | 'erp' | 'hrm' | 'commerce' | 'crm' | 'logistics' | 'system';

    balance: number;
    organization: Schema.Types.ObjectId;
    businessUnit: Schema.Types.ObjectId;
    isActive: boolean;
}
