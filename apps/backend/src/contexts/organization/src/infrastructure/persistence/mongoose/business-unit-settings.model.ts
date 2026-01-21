import { Schema, model, Document, Model } from 'mongoose';

export interface IBusinessUnitSettings extends Document {
    businessUnit: any;
    // Add other fields as needed
}

export interface IBusinessUnitSettingsModel extends Model<IBusinessUnitSettings> {
    getSettings(businessUnitId: string, session?: any): Promise<IBusinessUnitSettings>;
}

const businessUnitSettingsSchema = new Schema<IBusinessUnitSettings, IBusinessUnitSettingsModel>({
    businessUnit: { type: Schema.Types.ObjectId, ref: 'BusinessUnit', required: true },
    // stub fields
}, { timestamps: true });

businessUnitSettingsSchema.statics['getSettings'] = async function (businessUnitId: string, session?: any) {
    let settings = await this.findOne({ businessUnit: businessUnitId }).session(session || null);
    if (!settings) {
        const created = await this.create([{
            businessUnit: businessUnitId
        }], { session: session || null });
        return created[0]; // create([]) returns array
    }
    return settings;
};

export const BusinessUnitSettings = model<IBusinessUnitSettings, IBusinessUnitSettingsModel>('BusinessUnitSettings', businessUnitSettingsSchema);
