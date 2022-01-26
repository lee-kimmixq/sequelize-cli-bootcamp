module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addColumn(
      'attractions',
      'category_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('attractions', 'category_id');
    await queryInterface.dropTable('categories');
  },
};
