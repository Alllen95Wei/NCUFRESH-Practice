import express from "express";
// DB
// import db from "./db.js";
// Routes
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
// Middlewares
import logger from "./middlewares/logger.js";

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("dist"));
app.use(logger);

apiRouter.use("/auth", authRouter);
apiRouter.use("/products", productsRouter);

app.use("/api", apiRouter);

app.listen(3030);
