const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("sabor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
