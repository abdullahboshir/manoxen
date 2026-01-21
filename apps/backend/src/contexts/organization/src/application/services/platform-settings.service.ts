import { PlatformSettings } from "../../infrastructure/persistence/mongoose/platform-settings.model";
import type { IPlatformSettings } from "../../infrastructure/persistence/mongoose/platform-settings.interface";
import { CacheManager } from "@manoxen/core-util";

const getPlatformSettings = async () => {
    return await PlatformSettings.getSettings();
};

const updatePlatformSettings = async (payload: Partial<IPlatformSettings>) => {
    const settings = await PlatformSettings.getSettings();

    // Update fields dynamically or explicitly
    Object.assign(settings, payload);

    await settings.save();

    // Invalidate Cache
    await CacheManager.del('platform-settings');

    return settings;
};

export const PlatformSettingsService = {
    getPlatformSettings,
    updatePlatformSettings
};
