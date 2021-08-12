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
    precio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    decimal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.ENUM("publicado", "borrador", "eliminado"),
      allowNull: false,
    },
    tipoProducto: {
      type: DataTypes.ENUM("nuevo", "usado"),
      allowNull: false,
    },
    fechaAlta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
