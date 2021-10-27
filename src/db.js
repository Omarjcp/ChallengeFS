require("dotenv").config();
const fs = require("fs");
const { Sequelize } = require("sequelize");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Administrador, Categoria, Producto, Relleno, Sabor } = sequelize.models;

// Aca vendrian las relaciones
Categoria.hasMany(Producto);
Producto.belongsTo(Categoria);

Relleno.hasMany(Producto);
Producto.belongsTo(Relleno);

Sabor.hasMany(Producto);
Producto.belongsTo(Sabor);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Producto, Categoria } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
