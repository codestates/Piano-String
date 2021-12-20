const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  music.init({
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    account_uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'account',
        key: 'uuid'
      }
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'music',
  });
  return music;
};
