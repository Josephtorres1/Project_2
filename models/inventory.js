module.exports = function (sequelize, DataTypes) {
  const Inventory2 = sequelize.define("Inventory2", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Inventory2;
};
