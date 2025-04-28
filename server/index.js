import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.route.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
// import router from "./route/index.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "server is running" + PORT,
  });
});
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Database connected and server is running on port", PORT);
  });
});

app.use(express.urlencoded({ extended: true }));
