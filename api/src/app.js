import express from "express";
import cors from "cors";
import userRoutes from "../src/routes/User.js";
import productRoutes from "../src/routes/Product.js";
import { errorHandler } from "../src/middlewares/errorHandler.js";


const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);


export default app;