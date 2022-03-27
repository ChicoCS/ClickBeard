'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("time_list", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert("time_list", [
      {
        time: "08:00",
      },
      {
        time: "08:30",
      },
      {
        time: "09:00",
      },
      {
        time: "09:30",
      },
      {
        time: "10:00",
      },
      {
        time: "10:30",
      },
      {
        time: "11:00",
      },
      {
        time: "11:30",
      },
      {
        time: "12:00",
      },
      {
        time: "12:30",
      },
      {
        time: "13:00",
      },
      {
        time: "13:30",
      },
      {
        time: "14:00",
      },
      {
        time: "14:30",
      },
      {
        time: "15:00",
      },
      {
        time: "15:30",
      },
      {
        time: "16:00",
      },
      {
        time: "16:30",
      },
      {
        time: "17:00",
      },
      {
        time: "17:30",
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("time_list");
  },
};