const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class article_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  article_tag.init({
    article_uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      onDelete: 'cascade',
      references: {
        model: 'article',
        key: 'uuid'
      }
    },
    tag_uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      onDelete: 'cascade',
      references: {
        model: 'tag',
        key: 'uuid'
      }
    }
  }, {
    sequelize,
    modelName: 'article_tag',
  });
  return article_tag;
};
