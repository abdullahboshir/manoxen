export interface IRole {
    id: string;
    _id?: string;
    name: string;
    nameBangla?: string;
    description: string;
    descriptionBangla?: string;
    permissions: string[];
    permissionGroups: string[];
    inheritedRoles: string[];
    isSystemRole: boolean;
    roleScope: 'GLOBAL' | 'ORGANIZATION' | 'BUSINESS' | 'OUTLET';
    associatedModules: string[];
    isDefault: boolean;
    isActive: boolean;
    hierarchyLevel: number;
    organization?: string;
    createdBy: string;
    updatedBy: string;
}
