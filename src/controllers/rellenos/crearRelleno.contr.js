const jwt = require("jsonwebtoken");
const { Relleno } = require("../../db");

const crearRelleno = async (req, res) => {
  try {
    const { nombre } = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (nombre) {
          let rellenoCreado = await Relleno.create({
            nombre: nombre,
          });
          res.status(201).json({
            msg: "relleno creado correctamente",
            data: rellenoCreado,
          });
        } else {
          res.status(404).json({
            msg: "no se recibió el nombre del relleno para crearlo en la db",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al crear relleno", err);
  }
};

module.exports = crearRelleno;
