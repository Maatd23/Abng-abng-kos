'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilitiesKosan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FacilitiesKosan.belongsTo(models.Kosan)
      FacilitiesKosan.belongsTo(models.Facility)
    }
  }
  FacilitiesKosan.init({
    KosanId: DataTypes.INTEGER,
    FacilityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FacilitiesKosan',
  });
  return FacilitiesKosan;
};