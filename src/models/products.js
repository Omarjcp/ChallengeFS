const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  });
};
