import { SystemSettings } from "./system-settings.model";
import type { ISystemSettings } from "./system-settings.interface";
import { CacheManager } from "@manoxen/core-util";


const getSystemSettings = async () => {
    return await SystemSettings.getSettings();
};

const updateSystemSettings = async (payload: Partial<ISystemSettings>) => {
    const settings = await SystemSettings.getSettings();

    if (payload.softDeleteRetentionDays) {
        settings.softDeleteRetentionDays = payload.softDeleteRetentionDays;
    }

    if (payload.isRetentionPolicyEnabled !== undefined) {
        settings.isRetentionPolicyEnabled = payload.isRetentionPolicyEnabled;
    }

    if (payload.enabledModules) {
        settings.enabledModules = {
            ...settings.enabledModules,
            ...payload.enabledModules
        };
    }

    await settings.save();

    // Invalidate Cache so middleware gets fresh data immediately
    await CacheManager.del('system-settings');

    return settings;
};

export const SystemSettingsService = {
    getSystemSettings,
    updateSystemSettings
};

















