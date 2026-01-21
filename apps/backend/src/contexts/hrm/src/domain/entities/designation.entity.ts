export interface IDesignation {
    id?: string;
    name: string;
    code: string;
    description?: string;
    rank: number;
    department: string;
    defaultAccess?: string[];
    organization: string;
    businessUnit: string;
    isActive: boolean;
}
