
import { Router } from "express";
import { ThemeController } from "./theme.controller";

const router = Router();

router.post("/", ThemeController.createTheme);
router.get("/", ThemeController.getAllTheme);
router.get("/:id", ThemeController.getThemeById);
router.patch("/:id", ThemeController.updateTheme);
router.delete("/:id", ThemeController.deleteTheme);

export const ThemeRoutes = router;




