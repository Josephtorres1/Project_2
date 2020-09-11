module.exports = function (sequelize, DataTypes) {
  const FavoriteRecipes = sequelize.define("FavoriteRecipes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return FavoriteRecipes;
};
