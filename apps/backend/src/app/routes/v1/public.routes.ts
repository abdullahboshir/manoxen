import { Router } from "express";
import productsRoutes from "#contexts/storefront/src/interface/http/routes/catalog.routes";
import categoryRoutes from "#contexts/storefront/src/interface/http/routes/categories.routes";
import searchRoutes from "#contexts/storefront/src/interface/http/routes/search.routes";
import { storefrontRoutes } from "@manoxen/sales";

const router = Router();

router.use("/catalog", productsRoutes);
router.use("/categories", categoryRoutes);
router.use("/search", searchRoutes);
router.use("/storefront", storefrontRoutes);
// router.use("/deals", dealsRoutes);
// router.use("/flash-sales", flashSalesRoutes);
// router.use("/recommendations", recommendationsRoutes);

export const publicGroupRoutes = router;
















