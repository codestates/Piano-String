const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account.init({
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pw_hash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    salt: {
      allowNull: false,
      type: DataTypes.STRING
    },
    access: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    expired: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    expired_at: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};
