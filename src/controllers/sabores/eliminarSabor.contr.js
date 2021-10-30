const { Sabor } = require("../../db");
const jwt = require("jsonwebtoken");

const eliminarSabor = async (req, res) => {
  try {
    const { id } = req.params;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (id) {
          const saborEnDb = await Sabor.findOne({
            where: { id: id },
          });

          if (saborEnDb) {
            await Sabor.destroy({
              where: { id: id },
            });
            res.json({
              msg: "Sabor eliminado correctamente",
            });
          } else {
            res.json({
              msg: "Sabor no encontrado en la Db",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al eliminar sabor", err);
  }
};

module.exports = eliminarSabor;
