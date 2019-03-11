'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    edamamUrl: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    models.favorite.belongsTo(models.user);
    models.favorite.hasMany(models.comment);
  };
  return favorite;
};