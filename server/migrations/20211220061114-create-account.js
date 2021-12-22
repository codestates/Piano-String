module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('account', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      pw_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      access: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE(3),
      },
      expired_at: {
        type: Sequelize.DATE(3)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('account');
  },
};
