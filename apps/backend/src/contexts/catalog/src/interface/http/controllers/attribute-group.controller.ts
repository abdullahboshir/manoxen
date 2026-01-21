import { GenericController } from "@manoxen/core-util";
import { AttributeGroupService } from "../../../application/services/attribute-group.service";

const attributeGroupServiceMap = {
    create: AttributeGroupService.createAttributeGroup,
    getAll: AttributeGroupService.getAllAttributeGroups,
    getById: AttributeGroupService.getAttributeGroupById,
    update: AttributeGroupService.updateAttributeGroup,
    delete: AttributeGroupService.deleteAttributeGroup
};

export const AttributeGroupController = new GenericController(attributeGroupServiceMap, "AttributeGroup");
