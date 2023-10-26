import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import { routes } from "./router";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT,
  })
);

routes.forEach((route) => {
  app.use(route.path, route.router);
});

app.get("/", (req, res) => {
  res.send("Ingrese a /api/users para utilizar la api");
});

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
  console.log(`💻 SERVER >> Server running on port ${PORT}`);
});
