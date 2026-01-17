import express from 'express';
import { AttributeGroupController } from "./attribute-group.controller";
import { AttributeGroupValidations } from "./attribute-group.validation";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", AttributeGroupController.createAttributeGroup);
router.get("/", AttributeGroupController.getAllAttributeGroups);
router.get("/:id", AttributeGroupController.getAttributeGroupById);
router.patch("/:id", AttributeGroupController.updateAttributeGroup);
router.delete("/:id", AttributeGroupController.deleteAttributeGroup);

export const AttributeGroupRoutes = router;

export const AttributeGroupRouteValidations = {
    create: AttributeGroupValidations.createAttributeGroupValidationSchema,
    update: AttributeGroupValidations.updateAttributeGroupValidationSchema
};
