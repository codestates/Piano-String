const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  article.init({
    uuid: DataTypes.UUID,
    account_uuid: DataTypes.UUID,
    music_uuid: DataTypes.UUID,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};
