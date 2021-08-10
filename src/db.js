const fs = require("fs");
const { Sequelize } = require("sequelize");

let sequelize = new Sequelize("challengedb", "root", "4530447omar", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  // ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
