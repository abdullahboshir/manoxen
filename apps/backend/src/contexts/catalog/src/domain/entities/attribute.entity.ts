

export interface IAttribute {
    name: string;
    values: string[];
    businessUnit: string;
    organization: string;
    availableModules: ('pos' | 'erp' | 'hrm' | 'commerce' | 'crm' | 'logistics' | 'system')[];
    status: "active" | "inactive";
    createdBy: string;
}
