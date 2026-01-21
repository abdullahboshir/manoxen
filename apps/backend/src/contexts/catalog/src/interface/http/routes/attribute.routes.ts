import express from "express";
import { AttributeController } from "../controllers/attribute.controller";
import { createAttributeZodSchema, updateAttributeZodSchema } from "../validators/attribute.validation";

const router = express.Router();

// Routes are exported without auth/validation middleware
// Middleware is applied at backend route registration for security

router.post("/", AttributeController.create);
router.get("/", AttributeController.getAll);
router.get("/:id", AttributeController.getById);
router.patch("/:id", AttributeController.update);
router.delete("/:id", AttributeController.delete);

export const attributeRoutes = router;

export const attributeValidations = {
    create: createAttributeZodSchema,
    update: updateAttributeZodSchema
};
