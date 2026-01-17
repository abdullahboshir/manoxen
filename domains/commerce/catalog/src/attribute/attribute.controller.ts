import { GenericController, ApiResponse } from "@manoxen/core-util";
import httpStatus from "http-status";
import { AttributeService } from "./attribute.service";

const attributeServiceMap = {
    create: AttributeService.createAttribute,
    getAll: AttributeService.getAllAttributes,
    getById: AttributeService.getAttributeById,
    update: AttributeService.updateAttribute,
    delete: AttributeService.deleteAttribute
};

class AttributeGenericController extends GenericController<any> {
    override create = async (req: any, res: any, next: any) => {
        try {
            // Do NOT forcefully inject Business Unit here.
            // The frontend sends `null` for Global or a specific ID for Scoped.
            // If we force `req.user.businessUnits[0]`, we break Global creation for Super Admins.

            const result = await AttributeService.createAttribute(req.body);
            ApiResponse.success(
                res,
                result,
                "Attribute created successfully",
                httpStatus.CREATED
            );
        } catch (error) {
            next(error);
        }
    };
}

export const AttributeController = new AttributeGenericController(attributeServiceMap, "Attribute");
