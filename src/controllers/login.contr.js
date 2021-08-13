const jwt = require("jsonwebtoken");
const { Administrador } = require("../db");

const accesoUsuario = async (req, res) => {
  try {
    const { admin, password } = req.body;

    if (admin && password) {
      let admDb = await Administrador.findOne({ where: { admin, password } });
      if (admDb) {
        jwt.sign({ password }, "secretKey", (err, token) => {
          res.json({
            token,
          });
        });
      } else {
        res.json({
          msg: "credenciales invalidas",
        });
      }
    }
  } catch (err) {
    console.log("error al intentar loguear", err);
  }
};

module.exports = accesoUsuario;
