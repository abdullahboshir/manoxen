
import { PlatformSettings } from "../../infrastructure/persistence/mongoose/platform-settings.model";
import BusinessUnit from "../../infrastructure/persistence/mongoose/business-unit.model";

import { Organization } from "../../infrastructure/persistence/mongoose/organization.model";
import _ from 'lodash';
import Outlet from "../../outlet/outlet.model";
import { SystemSettings } from "#domain/system/index.js";

/**
 * Resolves a setting value by checking hierarchy:
 * 1. Outlet (Highest priority)
 * 2. Business Unit
 * 3. Organization
 * 4. Platform (Business Defaults)
 * 5. System (Infrastructure/Technical)
 */
const resolveSetting = async (key: string, context: { outletId?: string; businessUnitId?: string; organizationId?: string }, defaultValue?: any) => {
    // 1. Outlet Level
    if (context.outletId) {
        const outlet = await Outlet.findById(context.outletId).lean();
        const value = _.get((outlet as any)?.settings, key);
        if (value !== undefined && value !== null) return value;

        if (!context.businessUnitId && outlet) {
            context.businessUnitId = outlet.businessUnit.toString();
        }
    }

    // 2. Business Unit Level
    if (context.businessUnitId) {
        const bu = await BusinessUnit.findById(context.businessUnitId).lean();
        const value = _.get(bu?.settings, key);
        if (value !== undefined && value !== null) return value;
        
        if (!context.organizationId && bu) {
            context.organizationId =( bu as any).organization.toString();
        }
    }

    // 3. Organization Level
    if (context.organizationId) {
        const organization = await Organization.findById(context.organizationId).lean();
        const value = _.get(organization?.settings, key);
        if (value !== undefined && value !== null) return value;
    }

    // 4. Platform Level (Business Defaults)
    const platformSettings = await PlatformSettings.getSettings();
    const platformValue = _.get(platformSettings, key);
    if (platformValue !== undefined && platformValue !== null) return platformValue;

    // 5. System Level (Technical)
    const systemSettings = await SystemSettings.getSettings();
    const systemValue = _.get(systemSettings, key);
    if (systemValue !== undefined && systemValue !== null) return systemValue;

    return defaultValue;
};

export const SettingsResolutionService = {
    resolveSetting
};
