import { GenericController } from "@manoxen/core-util";
import { BrandService } from "../../../application/services/brand.service";

const brandServiceMap = {
    create: BrandService.createBrand,
    getAll: BrandService.getAllBrands,
    getById: BrandService.getBrandById,
    update: BrandService.updateBrand,
    delete: BrandService.deleteBrand
};

export const BrandController = new GenericController(brandServiceMap, "Brand");




