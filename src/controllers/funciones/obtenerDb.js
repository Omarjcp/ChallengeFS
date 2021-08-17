const { Producto, Categoria } = require("../../db");

const obtenerProductosDb = async () => {
  try {
    let productos = await Producto.findAll();
    return productos;
  } catch (err) {
    console.log(err);
  }
};

const obtenerProductoDbIdCateg = async (id) => {
  try {
    let productos = await Producto.findAll({ where: { categoriumId: id } });
    return productos;
  } catch (err) {
    console.log(err);
  }
};

const obtenerCategoriasDb = async () => {
  try {
    let categorias = await Categoria.findAll();
    return categorias;
  } catch (err) {
    console.log(err);
  }
};

const obtenerCategoriasIdDb = async (id) => {
  try {
    let categorias = await Categoria.findOne({ where: { id } });
    return categorias;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  obtenerProductosDb,
  obtenerCategoriasDb,
  obtenerCategoriasIdDb,
  obtenerProductoDbIdCateg,
};
