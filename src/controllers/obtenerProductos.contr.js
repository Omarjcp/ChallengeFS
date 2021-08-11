const axios = require("axios");
const { Producto, Categoria } = require("../db");
const { obtenerProductosDb } = require("./funciones/obtenerDb.js");
const filtradoNombre = require("./funciones/filtrado.js");

const obtenerProductos = async (req, res) => {
  try {
    let { name } = req.query;

    let productosDb = await obtenerProductosDb();

    if (name) {
      let productosFiltrados = await filtradoNombre(productosDb, name);

      if (productosFiltrados.length >= 1) {
        // let primerosCuatro = await productosFiltrados.slice(0, 4);
        res.json({
          tipo: "productos segun el nombre del producto",
          data: productosFiltrados,
        });
      } else {
        res.json({
          msg: "producto no encontrado",
        });
      }
    } else {
      if (productosDb) {
        // let primerosCuatroTotal = await productosDb.slice(0, 4);
        res.json({
          tipo: "todos los productos",
          data: productosDb,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  obtenerProductos,
};
