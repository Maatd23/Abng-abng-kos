"use strict";

const { hashPassword } = require("../helper/hasing");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../user.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPassword(el.password);
      return el
    });
    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
  },
};
