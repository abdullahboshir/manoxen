import { AdCampaign, type IAdCampaign } from "#contexts/marketing/src/infrastructure/persistence/mongoose/ad-campaign.model";
import { Pixel, type IPixel } from "#contexts/marketing/src/infrastructure/persistence/mongoose/pixel.model";
import { QueryBuilder, resolveBusinessUnitQuery, resolveBusinessUnitId } from "@manoxen/core-util";

/**
 * Ad Campaign Services
 */
const createAdCampaign = async (payload: Partial<IAdCampaign>) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any) as any;
    }
    const result = await AdCampaign.create(payload);
    return result;
};

const getAllAdCampaigns = async (query: any) => {
    const finalQuery = await resolveBusinessUnitQuery(query);
    const apiQuery = new QueryBuilder(AdCampaign.find().populate('businessUnit', 'name slug'), finalQuery)
        .search(['name', 'objective'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await apiQuery.modelQuery;
    const meta = await apiQuery.countTotal();
    return { meta, result };
};

const getAdCampaignById = async (id: string) => {
    return await AdCampaign.findById(id);
};

const updateAdCampaign = async (id: string, payload: Partial<IAdCampaign>) => {
    return await AdCampaign.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

const deleteAdCampaign = async (id: string) => {
    return await AdCampaign.findByIdAndDelete(id);
};

/**
 * Pixel Services
 */
const createPixel = async (payload: Partial<IPixel>) => {
    if (payload.businessUnit) {
        payload.businessUnit = await resolveBusinessUnitId(payload.businessUnit as any) as any;
    }
    const result = await Pixel.create(payload);
    return result;
};

const getAllPixels = async (query: any) => {
    const finalQuery = await resolveBusinessUnitQuery(query);
    const apiQuery = new QueryBuilder(Pixel.find().populate('businessUnit', 'name slug'), finalQuery)
        .search(['name', 'pixelId'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await apiQuery.modelQuery;
    const meta = await apiQuery.countTotal();
    return { meta, result };
};

const getPixelById = async (id: string) => {
    return await Pixel.findById(id);
};

const updatePixel = async (id: string, payload: Partial<IPixel>) => {
    return await Pixel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

const deletePixel = async (id: string) => {
    return await Pixel.findByIdAndDelete(id);
};

export const MarketingService = {
    createAdCampaign,
    getAllAdCampaigns,
    getAdCampaignById,
    updateAdCampaign,
    deleteAdCampaign,
    createPixel,
    getAllPixels,
    getPixelById,
    updatePixel,
    deletePixel
};
