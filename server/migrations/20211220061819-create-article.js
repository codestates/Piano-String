module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      account_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'accounts',
          key: 'uuid',
        },
      },
      music_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'music',
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
    await queryInterface.dropTable('articles');
  },
};
