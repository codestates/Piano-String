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
    article_uuid: DataTypes.UUID,
    tag_uuid: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'article_tag',
  });
  return article_tag;
};
