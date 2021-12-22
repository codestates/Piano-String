const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  announcement.init({
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
      type: DataTypes.TEXT
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'announcement',
  });
  return announcement;
};
