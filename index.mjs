import express from "express";
import { connectDB } from "./db/configurationDB.mjs";

import orderRouter from "./routes/order.routes.mjs";

const app = express();
app.use(express.json());

app.use("/user/orders", orderRouter);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});
