import type { IPlatformSettingsDocument } from "./platform-settings.interface";
import { PlatformSettings } from "./platform-settings.model";


export const PlatformSettingsService = {
    async getSettings(): Promise<IPlatformSettingsDocument> {
        return (PlatformSettings as any).getSettings();
    },

    async updateSettings(data: Partial<IPlatformSettingsDocument>): Promise<IPlatformSettingsDocument | null> {
        let settings = await PlatformSettings.findOne();
        if (!settings) {
            settings = await (PlatformSettings as any).getSettings();
        }
        if (settings) {
            Object.assign(settings, data);
            await settings.save();
        }
        return settings;
    }
};
















