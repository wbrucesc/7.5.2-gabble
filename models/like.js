'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    gab: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Gab",
        key: 'id'
      }
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    }
  });

  Like.associate = function(models){
    Like.belongsTo(models.Gab, {foreignKey: 'gab'});
    Like.belongsTo(models.User, {foreignKey: 'user'});
  };
  return Like;
};
