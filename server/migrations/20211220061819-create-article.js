module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      account_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'account',
          key: 'uuid',
        },
      },
      music_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'cascade',
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
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article');
  },
};
