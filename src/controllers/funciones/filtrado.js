//filtra los nombres ingresados por query string

async function filtradoNombre(productosAFiltrar, nombreAFiltrar) {
  let productoFiltrado = await productosAFiltrar.filter((producto) => {
    if (producto.nombre.toLowerCase().includes(nombreAFiltrar.toLowerCase()))
      return producto;
  });
  return productoFiltrado;
}

module.exports = filtradoNombre;
