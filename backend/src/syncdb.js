import db from "./db.js";

await db.sequelize.sync({ force: true });