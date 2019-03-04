'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
    edamamId: DataTypes.STRING,
    eventId: DataTypes.INTEGER
  }, {});
  recipe.associate = function(models) {
    // associations can be defined here
    models.recipe.belongsTo(models.event);
  };
  return recipe;
};