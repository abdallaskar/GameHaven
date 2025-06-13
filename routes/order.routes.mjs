import { Router } from "express";
import { validationSchema } from "../middlewares/validation.middleware.mjs";

import {
  getOrders,
  getSingleOrder,
  createAnOrder,
} from "../controllers/order.controller.mjs";

const orderRouter = Router();

orderRouter.route("/").get(getOrders).post(validationSchema(), createAnOrder);

orderRouter.route("/:id").get(getSingleOrder);

export default orderRouter;
