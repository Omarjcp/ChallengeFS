const { Relleno } = require("../../db");

const eliminarRelleno = async (req, res) => {
  try {
    const { id } = req.params;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (id) {
          let rellenoDb = await Relleno.findOne({
            where: { id: id },
          });

          if (rellenoDb) {
            await Relleno.destroy({
              where: { id: id },
            });
            res.json({
              msg: "Relleno eliminado correctamente",
            });
          } else {
            res.json({
              msg: "Relleno no existente",
            });
          }
        } else {
          res.json({
            msg: "Id de relleno no recibido",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al eliminar relleno", err);
  }
};

module.exports = eliminarRelleno;
