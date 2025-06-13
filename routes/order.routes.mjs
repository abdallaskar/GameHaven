import { Router } from "express";
import { validationSchema } from "../middlewares/validation.middleware.mjs";

import {
  getOrders,
  getSingleOrder,
  createAnOrder,
}
  from "../controllers/order.controller.mjs";

const orderRouter = Router();

// add Authtication middle ware and then get user id using parsing JWT read from data base cart items for this user 
// then delete this cart itesm and add it into order collection and get user messgae "order done" 
orderRouter.route("/").get(getOrders).post(validationSchema(), createAnOrder);

orderRouter.route("/:id").get(getSingleOrder);

export default orderRouter;
