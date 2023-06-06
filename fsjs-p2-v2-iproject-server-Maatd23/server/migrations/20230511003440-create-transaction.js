"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isPay: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
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
    await queryInterface.dropTable("Transactions");
  },
};
