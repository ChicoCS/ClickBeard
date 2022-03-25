"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("specialties_types", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert("specialties_types", [
      {
        name: "Cabelo",
      },
      {
        name: "Barba",
      },
      {
        name: "Sobrancelhas e cílios",
      },
      {
        name: "Unha",
      },
      {
        name: "Massagem",
      },
      {
        name: "Estética",
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("specialties_types");
  },
};
