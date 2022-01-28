module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'attractions',
      'latitude',
      {
        type: Sequelize.FLOAT,
      },
    );
    await queryInterface.addColumn(
      'attractions',
      'longitude',
      {
        type: Sequelize.FLOAT,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('attractions', 'longitude');
    await queryInterface.removeColumn('attractions', 'latitude');
  },
};
