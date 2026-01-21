import { Router } from "express";
import { AttributeGroupController } from "../controllers/attribute-group.controller";
import { createAttributeGroupValidationSchema, updateAttributeGroupValidationSchema } from "../validators/attribute-group.validation";

const router = Router();

router.post("/", AttributeGroupController.create);
router.get("/", AttributeGroupController.getAll);
router.get("/:id", AttributeGroupController.getById);
router.patch("/:id", AttributeGroupController.update);
router.delete("/:id", AttributeGroupController.delete);

export const attributeGroupRoutes = router;
