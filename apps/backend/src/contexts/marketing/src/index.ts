export { manifest as domainManifest } from "./domain-manifest";
import { Router } from "express";

const stub = Router();

export { AdCampaign } from "./infrastructure/persistence/mongoose/ad-campaign.model";
export { Pixel } from "./infrastructure/persistence/mongoose/pixel.model";
export { MarketingService } from "./application/services/marketing.service";

export {
    stub as marketingRoutes,
    stub as SEORoutes,
    stub as AffiliateRoutes,
    stub as EventRoutes,
    stub as PixelRoutes
};
