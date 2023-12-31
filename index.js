import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.error(error);
}

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("listening on port 5000"));
