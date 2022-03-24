"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [{
      name: "Barber ADM",
      login: "admin",
      password: "admin",
      email: "admin@admin.com",
      type: 1
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", {
      name: "Barber ADM",
      login: "admin",
      password: "admin",
      email: "admin@admin.com",
      type: 1
    });
  },
};
