import { Router } from "express";
import { customerRoutes } from "#contexts/contacts/src/interface/http/routes/customer.routes";

const router = Router();

router.use("/customer-profile", customerRoutes);
// router.use("/orders", ordersRoutes);
// router.use("/cart", cartRoutes);
// router.use("/wishlist", wishlistRoutes);
// router.use("/address", addressRoutes);
// router.use("/payment", paymentRoutes);
// router.use("/reviews", reviewsRoutes);
// router.use("/tracking", trackingRoutes);

export const customerGroupRoutes = router;
















