"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FacilitiesKosans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      FacilityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Facilities",
        },
      },
      KosanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Kosans",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FacilitiesKosans");
  },
};
