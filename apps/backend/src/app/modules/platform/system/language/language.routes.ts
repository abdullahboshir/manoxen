
import { Router } from "express";
import { LanguageController } from "./language.controller";

const router = Router();

router.post("/", LanguageController.createLanguage);
router.get("/", LanguageController.getAllLanguage);
router.get("/:id", LanguageController.getLanguageById);
router.patch("/:id", LanguageController.updateLanguage);
router.delete("/:id", LanguageController.deleteLanguage);

export const LanguageRoutes = router;
















