import express from "express";
import cors from "cors";
import { productRoutes } from "./routes/products.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.use(errorMiddleware);

export default app;
