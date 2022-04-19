const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("producto", {
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
    descripcion: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    foto: {
      type: DataTypes.CHAR,
    },
    estado: {
      type: DataTypes.ENUM("hay", "no hay", "consultar disponibilidad"),
      allowNull: false,
    },
  });
};
