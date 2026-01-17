import { Router } from "express";
import catalogRoutes from "./catalog.routes";
import categoryRoutes from "./categories.routes";
import searchRoutes from "./search.routes";
import { storefrontRoutes } from "#domain/sales/storefront/storefront.routes";
// import dealsRoutes from "./deals.routes";
// import flashSalesRoutes from "./flash-sales.routes";
// import recommendationsRoutes from "./recommendations.routes";

const router = Router();

router.use("/catalog", catalogRoutes);
router.use("/categories", categoryRoutes);
router.use("/search", searchRoutes);
router.use("/storefront", storefrontRoutes);
// router.use("/deals", dealsRoutes);
// router.use("/flash-sales", flashSalesRoutes);
// router.use("/recommendations", recommendationsRoutes);

export const publicGroupRoutes = router;
















