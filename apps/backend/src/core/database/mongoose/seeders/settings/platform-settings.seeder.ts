import { PlatformSettings } from "#app/modules/platform/settings/platform-settings/platform-settings.model";
import "colors";

/**
 * ðŸŒ Platform Settings Seeder
 * Ensures global branding and governance are initialized.
 * Idempotent: Only creates if not exists.
 */
export const seedPlatformSettings = async (session?: any) => {
    try {
        console.log("ðŸ™ï¸  Seeding Platform Settings...".blue);

        const existing = await PlatformSettings.findOne().session(session || null);
        if (!existing) {
            await (PlatformSettings as any).getSettings(session);
            console.log("   âœ… Initialized Global Platform Governance".green);
        } else {
            console.log("   â„¹ï¸ Platform Governance already exists".gray);
        }
    } catch (error: any) {
        console.error("âŒ Platform Settings Seeding Failed:".red, error?.message);
        throw error;
    }
};



















