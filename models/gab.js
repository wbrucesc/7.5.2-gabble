'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    author: DataTypes.STRING,
    body: DataTypes.TEXT
  });
  return Gab;
};
