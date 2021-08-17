const jwt = require("jsonwebtoken");
const { Administrador } = require("../db");

const accesoUsuario = async (req, res) => {
  try {
    const { admin, password } = req.body;

    if (admin && password) {
      let admDb = await Administrador.findOne({ where: { admin, password } });
      if (admDb) {
        let token = jwt.sign({ password }, "secretKey");
        res.json({
          token: token,
          msg: "sesion iniciada correctamente",
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
