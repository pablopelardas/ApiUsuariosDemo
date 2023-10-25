"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      names: DataTypes.STRING,
      lastnames: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      cuit: DataTypes.STRING,
      residence: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      email: DataTypes.STRING,
      updatedAt: {
        field: "updatedAt",
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      createdAt: {
        field: "createdAt",
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        field: "deletedAt",
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
