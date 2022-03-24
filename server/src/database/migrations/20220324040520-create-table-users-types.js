"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users_types", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert("users_types", [
      {
        id: 1,
        name: "admin"
      },
      {
        id: 2,
        name: "client"
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users_types");
  },
};
