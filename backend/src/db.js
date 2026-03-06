import fs from "node:fs/promises";
import path from "path";
import { pathToFileURL } from "node:url";
import { loadEnvFile } from "node:process";
import { Sequelize } from 'sequelize';

loadEnvFile(".env");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
    }
);

const db = {};
const modelDir = "src/models"

async function loadModels() {
    try {
        const files = await fs.readdir(modelDir);
        for (const file of files) {
            if (file.endsWith(".js")) {
                const modelPath = path.join(modelDir, file);
                console.log(modelPath);
                const module = await import(pathToFileURL(modelPath));
                if (module.initModel) {
                    const model = module.initModel(sequelize);
                    db[model.name] = model;
                    console.log("Model loaded:", model.name);
                }
            }
        }

        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
                console.log("Associated model:", modelName);
            }
        });

        await sequelize.authenticate();
        console.log("Connection test passed.");
    } catch (err) {
        console.error("Error loading models:", err);
    }
}

await loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
