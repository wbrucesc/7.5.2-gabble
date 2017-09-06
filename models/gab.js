'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    author: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });
  Gab.associate = function(models){
    Gab.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Gab;
};
