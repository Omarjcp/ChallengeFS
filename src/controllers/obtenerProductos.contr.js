const axios = require("axios");
const { Producto, Categoria } = require("../db");
const {
  obtenerProductosDb,
  obtenerProductoDbIdCateg,
} = require("./funciones/obtenerDb.js");
const { filtradoNombre } = require("./funciones/filtrado.js");

const obtenerProductos = async (req, res) => {
  try {
    let { name } = req.query;

    let productosDb = await obtenerProductosDb();

    if (name) {
      let productosFiltrados = await filtradoNombre(productosDb, name);

      if (productosFiltrados.length >= 1) {
        let primerosCuatro = await productosFiltrados.slice(0, 4);
        res.json({
          tipo: "productos segun el nombre del producto",
          data: primerosCuatro,
        });
      } else {
        res.json({
          msg: "producto no encontrado",
          data: productosDb,
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
    console.log("error al obtener productos", err);
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    let productosDb = await obtenerProductosDb();

    if (id) {
      let productoId = productosDb.filter((producto) => {
        if (Number(producto.id) === Number(id)) return producto;
      });

      if (productoId.length > 0) {
        res.json({
          tipo: "producto segun id pasado por param",
          data: productoId,
        });
      } else {
        res.json({
          msg: "producto no encontrado",
        });
      }
    }
  } catch (err) {
    console.log("error al obtener producto por id", err);
  }
};

const obtenerProductoPorIdCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    let productosDb = await obtenerProductoDbIdCateg(id);

    if (id) {
      if (productosDb.length > 0) {
        res.json({
          tipo: "producto segun id pasado por param",
          data: productosDb,
        });
      } else {
        res.json({
          msg: "producto no encontrado",
        });
      }
    }
  } catch (err) {
    console.log("error al obtener producto por id", err);
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductoPorIdCategoria,
};
