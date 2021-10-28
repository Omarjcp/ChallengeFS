const { Sabor } = require("../../db");

const obtenerSabores = async (req, res) => {
  try {
    let saboresDb = await Sabor.findAll();

    if (saboresDb.length > 0) {
      res.json({
        tipo: "todos los sabores de la db",
        data: saboresDb,
      });
    } else {
      res.json({
        msg: "no se encontraron sabores en la Db",
      });
    }
  } catch (err) {
    console.log("error al obtener los sabores", err);
  }
};

module.exports = obtenerSabores;
