const { Categoria } = require("../../db");

const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (id) {
          let categoriaDb = await Categoria.findOne({
            where: { id: id },
          });

          if (categoriaDb) {
            await Categoria.destroy({
              where: { id: id },
            });
            res.json({
              msg: "Categoria eliminada correctamente",
            });
          } else {
            res.json({
              msg: "Categoria no existente",
            });
          }
        } else {
          res.json({
            msg: "Id de categoria no recibido",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al eliminar categoria", err);
  }
};

module.exports = eliminarCategoria;
