const { Sabor } = require("../../db");
const jwt = require("jsonwebtoken");

const crearSabor = async (req, res) => {
  try {
    const { nombre } = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (nombre) {
          const saborCreado = await Sabor.create({
            nombre: nombre,
          });

          if (saborCreado) {
            res.json({
              msg: "sabor creado correctamente",
            });
          }
        } else {
          res.json({
            msg: "Nombre de sabor no recibido",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al crear un sabor", err);
  }
};

module.exports = crearSabor;
