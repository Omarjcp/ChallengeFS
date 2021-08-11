const axios = require("axios");
const { Producto, Categoria } = require("../../db.js");

const obtenerProductosDb = async () => {
  try {
    //solicitud a DB
    let productos = await Producto.findAll();
    return productos;
  } catch (err) {
    console.log(err);
  }
};
obtenerProductosDb();

module.exports = {
  obtenerProductosDb,
};
