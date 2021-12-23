module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article_tag', {
      article_uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'article',
          key: 'uuid',
        },
      },
      tag_uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'tag',
          key: 'uuid',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article_tag');
  },
};
