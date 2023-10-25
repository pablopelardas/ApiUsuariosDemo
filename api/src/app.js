require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

// const errorHandler = require('./middlewares/errorHandler') ;
// const notFound = require('./middlewares/notFound') ;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "authorization",
    ],
  })
);

// Add Routes and tasks
const routes = require("./routes/index");

routes.forEach((x) => app.use(x.basePath, x.router));

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const { port } = server.address();

  // eslint-disable-next-line no-console
  console.log(`App listening at ${host}:${port}`);
});

// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
