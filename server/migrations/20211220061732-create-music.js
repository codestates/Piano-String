module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('music', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      title: {
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.JSON,
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
