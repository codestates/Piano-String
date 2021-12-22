module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('announcement', {
      uuid: {
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
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('announcement');
  },
};
