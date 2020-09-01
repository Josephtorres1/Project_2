module.exports = function (sequelize, DataTypes) {
  const Inventory2 = sequelize.define("Inventory2", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Inventory2;
};
