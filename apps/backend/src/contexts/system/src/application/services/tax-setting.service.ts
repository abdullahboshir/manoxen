
import { TaxSetting } from '#domain/system/infrastructure/persistence/mongoose/tax-setting.model.js';
import { AppError } from '@manoxen/core-util';
import status from 'http-status';

export class TaxSettingService {
    static async createTaxSetting(data: any, user: any) {
        const organizationId = user.organization;
        const businessUnitId = user.businessUnit;
        
        if (data.isDefault) {
            await TaxSetting.updateMany({ businessUnitId }, { isDefault: false });
        }

        const taxSetting = await TaxSetting.create({
            ...data,
            organizationId,
            businessUnitId
        });
        
        return taxSetting;
    }

    static async getTaxSettings(user: any) {
        return TaxSetting.find({ businessUnitId: user.businessUnit });
    }

    static async updateTaxSetting(id: string, data: any, user: any) {
        const businessUnitId = user.businessUnit;
        const query = { _id: id, businessUnitId };

        const taxSetting = await TaxSetting.findOneAndUpdate(query, data, { new: true });
        
        if (!taxSetting) {
            throw new AppError(status.NOT_FOUND, 'Tax setting not found');
        }
        
        return taxSetting;
    }

    static async deleteTaxSetting(id: string, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const taxSetting = await TaxSetting.findOneAndDelete(query);
        
        if (!taxSetting) {
            throw new AppError(status.NOT_FOUND, 'Tax setting not found');
        }
        
        return taxSetting;
    }
}
