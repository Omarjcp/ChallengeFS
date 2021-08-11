const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "administrador",
    {
      admin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
