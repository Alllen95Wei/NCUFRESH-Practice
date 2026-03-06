import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const { payload, protectedHeader } = await jwtVerify(token, secret);
        req.user = payload;
    } catch (error) {
        if (error.code === "ERR_JWT_EXPIRED") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }

    next();
}

export function checkRoles(requiredRole) {
    return (req, res, next) => {
        const userRoles = req.user.roles || [];

        if (userRoles.includes(requiredRole)) {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    }
}