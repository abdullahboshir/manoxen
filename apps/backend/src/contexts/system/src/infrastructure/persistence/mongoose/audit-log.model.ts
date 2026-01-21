import { Schema, model } from "mongoose";
import { contextScopePlugin } from "@manoxen/core-util";

export interface IAuditLog {
    action: string;
    module: 'pos' | 'erp' | 'hrm' | 'commerce' | 'crm' | 'logistics' | 'system';
    actor: {
        userId: Schema.Types.ObjectId;
        role?: string;
        ip?: string;
    };
    target: {
        resource: string;
        resourceId: string;
    };
    organization?: Schema.Types.ObjectId;
    businessUnit?: Schema.Types.ObjectId;
    scope: 'GLOBAL' | 'ORGANIZATION' | 'BUSINESS' | 'OUTLET';
    requestPayload?: Record<string, any>;
    responseStatus?: number;
    duration?: number;
    changes?: Record<string, any>;
    metadata?: Record<string, any>;
    timestamp: Date;
}

const auditLogSchema = new Schema<IAuditLog>({
    action: { type: String, required: true },
    module: {
        type: String,
        enum: ['pos', 'erp', 'hrm', 'commerce', 'crm', 'logistics', 'system'],
        required: true,
        index: true
    },
    actor: {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String },
        ip: { type: String }
    },
    target: {
        resource: { type: String, required: true },
        resourceId: { type: String, required: true }
    },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', index: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: false },
    scope: { type: String, enum: ['GLOBAL', 'ORGANIZATION', 'BUSINESS', 'OUTLET'], default: 'BUSINESS' },
    requestPayload: { type: Schema.Types.Mixed },
    responseStatus: { type: Number },
    duration: { type: Number },
    changes: { type: Schema.Types.Mixed },
    metadata: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now }
}, {
    timestamps: true
});

auditLogSchema.index({ module: 1, timestamp: -1 });
auditLogSchema.index({ businessUnit: 1, module: 1 });

export const AuditLog = model<IAuditLog>('AuditLog', auditLogSchema);

auditLogSchema.plugin(contextScopePlugin, {
    organizationField: 'organization',
    businessUnitField: 'businessUnit'
});
