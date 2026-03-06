import { Router } from "express";

import db from "../db.js";
import { checkRoles } from "../middlewares/auth.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await db.Product.findAll();
    let productsJSON = [];
    for (const product of products) {
        productsJSON.push(product.toJSON());
    }
    res.json(productsJSON);
});

router.get("/:id", async (req, res) => {
    const product = await db.Product.findByPk(req.params.id);
    if (product === null) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product.toJSON());
});

export default router;