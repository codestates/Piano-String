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
      // account.associate(models.announcement, {foreignKey: 'account_uuid', sourceKey: 'uuid'});
      // account.associate(models.music, {foreignKey: 'account_uuid', sourceKey: 'uuid'});
      // account.associate(models.article, {foreignKey: 'account_uuid', sourceKey: 'uuid'});
      
    }
  }
  account.init({
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: {
      allowNull: false,
      unique: true,
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
    tableName: 'account',
    timestamps: false,
  });
  return account;
};
