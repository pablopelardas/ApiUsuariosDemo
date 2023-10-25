const models = require("../database/models");

module.exports = {
  name: "users",
  index: async (req, res, next) => {
    console.log(models.test);
    res.send("Hello World from Users!");
  },
  getAll: async (req, res, next) => {
    const users = await models.User.findAll();
    res.json(users);
  },
};
