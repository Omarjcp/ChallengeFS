const axios = require("axios");
const { Producto, Categoria } = require("../../db");
const {
  obtenerProductosDb,
  obtenerProductoDbIdCateg,
  obtenerProductoDbIdRelleno,
} = require("../funciones/obtenerDb");
const { filtradoNombre } = require("../funciones/filtrado.js");

const obtenerProductos = async (req, res) => {
  try {
    let { name, categoria, relleno, sabor, id } = req.query;

    let productosDb = await obtenerProductosDb();

    if (name) {
      let productosFiltrados = await filtradoNombre(productosDb, name);

      if (productosFiltrados.length >= 1) {
        res.json({
          tipo: "productos segun el nombre del producto",
          data: productosFiltrados,
        });
      } else {
        res.json({
          msg: "producto no encontrado",
        });
      }
    } else if (categoria && id) {
      let productosDb = await obtenerProductoDbIdCateg(categoria, id);
      if (productosDb.length > 0) {
        res.json({
          tipo: "producto segun id de categoria pasado por param",
          data: productosDb,
        });
      } else {
        res.json({
          msg: "producto no encontrado",
        });
      }
    } else {
      if (productosDb) {
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

    if (id) {
      const productoPorId = await Producto.findOne({
        where: { id: id },
      });

      if (productoPorId) {
        res.json({
          tipo: "producto segun id pasado por param",
          data: productoPorId,
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

// const obtenerProductoPorIdCategoria = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let productosDb = await obtenerProductoDbIdCateg(id);

//     if (id) {
//       if (productosDb.length > 0) {
//         res.json({
//           tipo: "producto segun id pasado por param",
//           data: productosDb,
//         });
//       } else {
//         res.json({
//           msg: "producto no encontrado",
//         });
//       }
//     }
//   } catch (err) {
//     console.log("error al obtener producto por id", err);
//   }
// };

// const obtenerProductoPorIdRelleno = async (req, res) => {
//   try {
//     const { id } = req.params;

//     let productosDb = await obtenerProductoDbIdRelleno(id);

//     if (id) {
//       if (productosDb.length > 0) {
//         res.json({
//           tipo: "producto segun id de relleno pasado por param",
//           data: productosDb,
//         });
//       } else {
//         res.json({
//           msg: "producto no encontrado",
//         });
//       }
//     }
//   } catch (err) {
//     console.log("error al obtener producto por id", err);
//   }
// };

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  // obtenerProductoPorIdCategoria,
  // obtenerProductoPorIdRelleno,
};
