const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // account.associate(models.article_tag, {foreignKey: 'tag_uuid', sourceKey: 'uuid'});
    }
  }
  tag.init({
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};
