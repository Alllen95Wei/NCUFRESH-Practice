import { Router } from "express";

import db from "../db.js";
import { Category } from "../models/category.js";
import { checkRoles } from "../middlewares/auth.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await db.Product.findAll({ limit: 50 });
    let productsJSON = [];
    for (const product of products) {
        productsJSON.push(product.toJSON());
    }
    res.json(productsJSON);
});

router.get("/:id", async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, {
        include: [
            { model: Category, as: "categories" },
        ]
    });
    if (product === null) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product.toJSON());
});

router.get("/:id/image", async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, { attributes: ["image"] });
    if (product === null) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json({ image: product.image });
})

export default router;