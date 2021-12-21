module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tag', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tag');
  },
};
