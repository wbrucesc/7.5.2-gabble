'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
  User.associate = function(models){
    User.hasMany(models.Gab, {foreignKey: 'userId'});
    User.hasMany(models.Like, {foreignKey: 'user'});
  };
  return User;
};
