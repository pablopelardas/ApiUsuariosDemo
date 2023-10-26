import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import swaggerOptions from "./swaggerOptions";
import { routes } from "./router";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());
app.use(morgan("dev"));

routes.forEach((route) => {
  app.use(route.path, route.router);
});

const specs = swaggerJSDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Ingrese a /api/users para utilizar la api");
});

export default app;
