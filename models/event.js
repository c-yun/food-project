'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    cook: DataTypes.STRING
  }, {});
  event.associate = function(models) {
    // associations can be defined here
    models.event.belongsTo(models.user);
    models.event.hasMany(models.recipe);
  };
  return event;
};