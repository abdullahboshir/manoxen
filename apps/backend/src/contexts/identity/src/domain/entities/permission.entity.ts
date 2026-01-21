export interface IPermission {
    id: string;
    _id?: string;
    module: string;
    resource: string;
    action: string;
    scope: string;
    effect: 'allow' | 'deny';
    attributes?: string[];
    conditions?: any[];
    resolver?: any;
    description: string;
    descriptionBangla?: string;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
}
