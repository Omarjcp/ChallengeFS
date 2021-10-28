const { Sabor } = require("../../db");

const crearSabor = async (req, res) => {
  try {
    console.log("sabor creado");
  } catch (err) {
    console.log("error al crear un sabor", err);
  }
};

module.exports = crearSabor;
