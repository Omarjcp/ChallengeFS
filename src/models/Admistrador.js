const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "administrador",
    {
      admin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
