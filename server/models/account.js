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
    uuid: DataTypes.UUID,
    user_id: DataTypes.STRING,
    pw_hash: DataTypes.STRING,
    name: DataTypes.STRING,
    salt: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    expired: DataTypes.BOOLEAN,
    expired_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};
