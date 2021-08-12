const { Producto, Categoria } = require("../../db.js");

// filtra array de productos ingresado en el parametro y busca si
// existe el nombre pasado por parametro tambien
async function filtradoNombre(productosAFiltrar, nombreAFiltrar) {
  let productoFiltrado = await productosAFiltrar.filter((producto) => {
    if (producto.nombre.toLowerCase().includes(nombreAFiltrar.toLowerCase()))
      return producto;
  });
  return productoFiltrado;
}

module.exports = {
  filtradoNombre,
};
