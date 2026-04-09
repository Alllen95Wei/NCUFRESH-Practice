import { Router } from "express";
import multer from "multer";
import { decodeJwt } from "jose";

import db from "../db.js";

const router = Router();
const formHandler = multer();

router.post("/", formHandler.none(), async (req, res) => {
   const body = req.body;
   if (!body || !body.token) {
      return res.sendStatus(400);
   }
   const token = body.token;
   const { id, roles } = await decodeJwt(token);
   if (!roles.includes("customer")) {
      return res.sendStatus(403);
   }
   const cart = JSON.parse(body.cart);
   const address = body["postal-code"] + body["city"] + body["district"] + body["street-address"];
   const order = await db.Order.create({
      shippingAddress: address,
      recipientName: body["recipient-name"],
      recipientEmail: body["recipient-email"],
      recipientPhone: body["recipient-phone"],
      userId: id,
   });
   for (const item of cart) {
      console.log(item);
      await order.addItem(item.id, item.quantity, parseInt(item.price));
   }
   console.log(order.toJSON());
   return res.status(200).json({ orderId: order.id });
});

router.get("/:id", async (req, res) => {
   const token = req.headers.authorization;
   if (!token) {
      return res.sendStatus(403);
   }
   const order = await db.Order.findByPk(req.params.id, {
      include: [
         { model: db.Product, as: "products" },
      ]
   });
   if (order === null) {
      return res.status(404).json({ message: "Order not found" });
   }
   const { id } = await decodeJwt(token);
   if (parseInt(id) !== order.userId) {
      return res.status(403).json({ message: "Not authorized" });
   }
   res.json(order.toJSON());
})

export default router;
