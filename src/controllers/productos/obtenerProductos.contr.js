const { Producto, Categoria, Relleno, Sabor } = require("../../db");
const { obtenerProductosDb } = require("../funciones/obtenerDb");
const { filtradoNombre } = require("../funciones/filtrado.js");

const obtenerProductos = async (req, res) => {
  try {
    let { name, categoryId, rellenoId, saborId } = req.query;

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
    }
    if (categoryId || rellenoId || saborId) {
      let productosDb = await Producto.findAll();

      let productsFilter = productosDb.filter((product) => {
        if (
          Number(product.categoriumId) === Number(categoryId) ||
          Number(product.saborId) === Number(saborId) ||
          Number(product.rellenoId) === Number(rellenoId)
        ) {
          return product;
        }
      });

      if (productsFilter.length > 0) {
        res.json({
          tipo: "producto segun id de categoria pasado por param",
          data: productsFilter,
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

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
};
