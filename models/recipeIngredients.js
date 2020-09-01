module.exports = function (sequelize, DataTypes) {
  const RecipeIngredients = sequelize.define("RecipeIngredients", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return RecipeIngredients;
};
