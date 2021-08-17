// const { filtradoNombre } = require("./funciones/filtrado");
const {
  obtenerCategoriasDb,
  obtenerCategoriasIdDb,
} = require("./funciones/obtenerDb");

const obtenerCategorias = async (req, res) => {
  try {
    let { id } = req.query;

    let categoriasDb = await obtenerCategoriasDb();
    let categoriaIdDb = await obtenerCategoriasIdDb(id);

    if (id) {
      if (categoriaIdDb) {
        res.json({
          tipo: "categoria segun id",
          data: categoriaIdDb,
        });
      } else {
        res.json({
          msg: "categoria no encontrada",
        });
      }
    } else {
      if (categoriasDb) {
        res.json({
          tipo: "todas las categorias",
          data: categoriasDb,
        });
      }
    }
  } catch (err) {
    console.log("error al obtener categorias", err);
  }
};

module.exports = obtenerCategorias;
