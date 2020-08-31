module.exports = function (sequelize, DataTypes) {
  const Inventory = sequelize.define("Inventory", {
    text: DataTypes.STRING,
  });
  return Inventory;
};
