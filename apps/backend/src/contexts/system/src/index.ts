export { manifest as domainManifest } from "./domain-manifest";
import { Router } from "express";

export { SystemSettingsRoutes } from "./interface/http/routes/system-settings.routes";
export { default as mediaRoutes } from "./interface/http/routes/media.routes";
export { auditMiddleware } from "./interface/http/middleware/audit.middleware";

export { SystemSettingsService } from "./application/services/system-settings.service";
export { MaintenanceService } from "./application/services/maintenance.service";
export { SecurityReviewService } from "./application/services/security-review.service";
export { MediaService } from "./application/services/media.service";
export { TaxSettingService } from "./application/services/tax-setting.service";
export { PaymentGatewayService } from "./application/services/payment-gateway.service";

export { SystemSettings } from "./infrastructure/persistence/mongoose/system-settings.model";
export { AuditLog } from "./infrastructure/persistence/mongoose/audit-log.model";
export { Media } from "./infrastructure/persistence/mongoose/media.model";
export { TaxSetting } from "./infrastructure/persistence/mongoose/tax-setting.model";
export { PaymentGateway } from "./infrastructure/persistence/mongoose/payment-gateway.model";

export { SecurityAlert } from "./infrastructure/persistence/mongoose/security-alert.model";
export { NotificationTemplate } from "./infrastructure/persistence/mongoose/notification-template.model";
export { ApiKey } from "./infrastructure/persistence/mongoose/api-key.model";

export { QueueService } from "./infrastructure/queue/queue.service";
export { QUEUE_NAMES } from "./infrastructure/queue/queue.interface";

const stub = Router();

export {
    stub as AuditLogRoutes,
    stub as BackupRoutes,
    stub as NotificationRoutes,
    stub as CurrencyRoutes,
    stub as LanguageRoutes,
    stub as ZoneRoutes,
    stub as APIKeyRoutes,
    stub as WebhookRoutes,
    stub as EmailTemplateRoutes,
    stub as SMSTemplateRoutes
};
