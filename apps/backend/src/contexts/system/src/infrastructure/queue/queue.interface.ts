export const QUEUE_NAMES = {
    EMAIL: 'email-queue',
    AUTOMATION: 'automation-queue',
    DATA_EXPORT: 'data-export-queue',
    MAINTENANCE: 'maintenance-queue',
} as const;

export type TQueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

export interface IEmailJobPayload {
    to: string;
    subject: string;
    templateId?: string;
    template?: string;
    body?: string;
    context?: Record<string, any>;
    data?: Record<string, any>;
}

export interface IAutomationJobPayload {
    triggerType: string;
    data: Record<string, any>;
    businessUnitId: string;
}

export interface IMaintenanceJobPayload {
    taskName: string;
    options?: Record<string, any>;
}

export type TJobData = IEmailJobPayload | IAutomationJobPayload | IMaintenanceJobPayload;
