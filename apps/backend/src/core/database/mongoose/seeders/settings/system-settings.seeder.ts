import { SystemSettings } from "#app/modules/platform/settings/system-settings/system-settings.model";
import "colors";

/**
 * ðŸ› ï¸ System Settings Seeder
 * Ensures the infrastructural backbone is initialized.
 * Idempotent: Only creates if not exists.
 */
export const seedSystemSettings = async (session?: any) => {
    try {
        console.log("âš™ï¸  Seeding System Settings...".blue);

        const existing = await SystemSettings.findOne().session(session || null);
        if (!existing) {
            await (SystemSettings as any).getSettings(session);
            console.log("   âœ… Initialized Industrial System Core".green);
        } else {
            console.log("   â„¹ï¸ System Core already exists".gray);
        }
    } catch (error: any) {
        console.error("âŒ System Settings Seeding Failed:".red, error?.message);
        throw error;
    }
};


















