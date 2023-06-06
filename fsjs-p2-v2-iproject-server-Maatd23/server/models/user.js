"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/hasing");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Kosan);
      User.belongsToMany(models.Kosan, {through: models.Transaction})
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "invalid format email",
          },
          notEmpty: {
            msg: "name is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name is required",
          },
          notEmpty: {
            msg: "name is required",
          },
        },
      },
      address: DataTypes.STRING,
      handphone: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
