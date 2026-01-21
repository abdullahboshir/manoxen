export interface IPermissionGroup {
    id: string;
    _id?: string;
    name: string;
    module: string;
    description: string;
    permissions: string[];
    resolver?: {
        strategy: string;
        priority: number;
        inheritFrom?: string[];
        override?: boolean;
        fallback?: string;
    };
    isActive: boolean;
}
