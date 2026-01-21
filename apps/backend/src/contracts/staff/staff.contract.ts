export interface IStaffContract {
    id: string;
    fullName: string;
    role: string;
    permissions: string[];
    businessUnitId: string;
    isActive: boolean;
}

export interface IStaffServiceContract {
    getStaffById(id: string): Promise<IStaffContract | null>;
    isStaffAuthorized(staffId: string, permission: string): Promise<boolean>;
}
