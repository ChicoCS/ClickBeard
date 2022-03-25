'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("barbers_specialties", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      barber_id: {
        type: Sequelize.INTEGER,
        references:{model: 'barbers', key: 'id'},
        allowNull: false,
      },
      specialty_id: {
        type: Sequelize.INTEGER,
        references:{model: 'specialties_types', key: 'id'},
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("barbers_specialties");
  },
};
