"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kosan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kosan.belongsToMany(models.Facility, { through: models.FacilitiesKosan, foreignKey: 'KosanId' });
      Kosan.belongsTo(models.User);
      Kosan.belongsToMany(models.User, {through: models.Transaction})
    }
  }
  Kosan.init(
    {
      name: {
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.STRING,
      },
      latitude: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Kosan",
    }
  );
  return Kosan;
};
