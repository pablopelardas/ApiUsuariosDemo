const express = require("express");

const router = express.Router();
const controllers = require("../controllers/index");

// INDEX
router.get("/", [], controllers.users.getAll);

module.exports = {
  basePath: "/users",
  router,
};
