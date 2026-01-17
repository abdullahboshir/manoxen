import { Router } from "express";
import profileRoutes from "./profile.routes";
// import ordersRoutes from "./orders.routes";
// import cartRoutes from "./cart.routes";
// import wishlistRoutes from "./wishlist.routes";
// import addressRoutes from "./address.routes";
// import paymentRoutes from "./payment.routes";
// import reviewsRoutes from "./reviews.routes";
// import trackingRoutes from "./tracking.routes";

const router = Router();

router.use("/customer-profile", profileRoutes);
// router.use("/orders", ordersRoutes);
// router.use("/cart", cartRoutes);
// router.use("/wishlist", wishlistRoutes);
// router.use("/address", addressRoutes);
// router.use("/payment", paymentRoutes);
// router.use("/reviews", reviewsRoutes);
// router.use("/tracking", trackingRoutes);

export const customerGroupRoutes = router;
















