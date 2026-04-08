import { Router } from "express";

import db from "../db.js";
import { Category } from "../models/category.js";

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

router.get("/:id/:attr", async (req, res) => {
    const validAttrs = Object.keys(db.Product.getAttributes());
    const reqAttr = req.params.attr;
    if (!(validAttrs.includes(reqAttr))) {
        return res.status(400).json({ message: "Invalid attribute requested" });
    }
    const product = await db.Product.findByPk(
        req.params.id, { attributes: [ reqAttr ] }
    );
    if (product === null) {
        return res.status(404).json({ message: "Product not found" });
    }
    let body = {};
    body[reqAttr] = product[reqAttr];
    res.json(body);
})

export default router;