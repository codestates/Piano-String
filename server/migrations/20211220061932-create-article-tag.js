module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article_tags', {
      article_uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'articles',
          key: 'uuid',
        },
      },
      tag_uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'tags',
          key: 'uuid',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article_tags');
  },
};
