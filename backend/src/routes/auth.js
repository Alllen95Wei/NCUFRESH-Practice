import { Router } from "express";

import db from "../db.js";
import generateJWT from "../utils/signJWT.js";

const router = Router();

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await db.User.findOne({
        where: { email },
    });
    if (user === null) {
        return res.status(401).json({ message: "Invalid email" });
    }
    if (await user.verifyPassword(password)) {
        const token = await generateJWT(user);
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
        };
        return res.json({ token: token, user: userData });
    } else {
        return res.status(401).json({ message: "Invalid password" });
    }
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await db.User.create({ name, email, password });
        return res.sendStatus(201);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "Email already in use" });
        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;