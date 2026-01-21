import express from 'express';

import { createCustomerController, getAllCustomersController } from "../controllers/customer.controller";

const router = express.Router();

router.get('/', getAllCustomersController);
router.post('/create', createCustomerController);

export const customerRoutes = router;
















