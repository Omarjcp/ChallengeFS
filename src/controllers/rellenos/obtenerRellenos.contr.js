const { Relleno } = require("../../db");

const obtenerRellenos = async (req, res) => {
  try {
    let { id } = req.query;

    if (id) {
      let rellenoSegunId = await Relleno.findOne({
        where: { id: id },
      });

      if (rellenoSegunId) {
        res.json({
          tipo: "relleno segun id",
          data: rellenoSegunId,
        });
      } else {
        res.json({
          msg: "relleno no encontrado en la db",
        });
      }
    } else {
      let todosRellenos = await Relleno.findAll();
      if (todosRellenos) {
        res.json({
          tipo: "todos los rellenos de la db",
          data: todosRellenos,
        });
      } else {
        res.json({
          msg: "no hay relleno",
        });
      }
    }
  } catch (err) {
    console.log("error al obtener categorias", err);
  }
};

module.exports = obtenerRellenos;
