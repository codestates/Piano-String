module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('music', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      account_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'account',
          key: 'uuid',
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('music');
  },
};
