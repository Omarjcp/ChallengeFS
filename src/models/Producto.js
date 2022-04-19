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
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING(1234),
    },
    estado: {
      type: DataTypes.ENUM("hay", "no hay", "consultar disponibilidad"),
      allowNull: false,
    },
  });
};
