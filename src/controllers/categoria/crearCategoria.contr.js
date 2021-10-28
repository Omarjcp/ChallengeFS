const jwt = require("jsonwebtoken");
const { Categoria } = require("../../db.js");

const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (nombre) {
          const categoriaCreada = await Categoria.create({
            nombre: nombre,
          });

          res.json({
            msg: "categoria creada correctamente",
            data: categoriaCreada,
          });
        }
      }
    });
  } catch (err) {
    console.log("error al crear categoria", err);
  }
};

module.exports = {
  crearCategoria,
};
