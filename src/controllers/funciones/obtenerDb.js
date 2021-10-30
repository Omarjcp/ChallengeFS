const { Producto, Categoria } = require("../../db");

const obtenerProductosDb = async () => {
  try {
    let productos = await Producto.findAll();
    return productos;
  } catch (err) {
    console.log(err);
  }
};

const obtenerProductoDbIdCateg = async (catg, id) => {
  try {
    if (catg === "categoria") {
      let productos = await Producto.findAll({ where: { categoriumId: id } });
      return productos;
    } else if (catg === "relleno") {
      let productos = await Producto.findAll({ where: { rellenoId: id } });
      return productos;
    } else {
      let productos = await Producto.findAll({ where: { saborId: id } });
      return productos;
    }
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
