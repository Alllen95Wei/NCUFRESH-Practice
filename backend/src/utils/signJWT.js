import {SignJWT} from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const algorithm = "HS256";

export default async function generateJWT(user) {
    const payload = {
        id: user.id,
        roles: user.roles,
    };

    return await new SignJWT(payload)
        .setProtectedHeader({alg: algorithm})
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(secret);
}
