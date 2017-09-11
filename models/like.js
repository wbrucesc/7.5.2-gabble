'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    gab: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Gabs",
        key: 'id'
      }
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    isLiked: {
      type: DataTypes.BOOLEAN
    }
  });

  Like.associate = function(models){
    Like.belongsTo(models.Gab, {foreignKey: 'gab'});
    Like.belongsTo(models.User, {foreignKey: 'user', as: 'fan'});
  };
  return Like;
};
