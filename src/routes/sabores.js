const { Router } = require("express");

const midDelToken = require("../controllers/funciones/comprobacionToken");
const crearSabor = require("../controllers/sabores/crearSabor.contr");

const obtenerSabores = require("../controllers/sabores/obtenerSabores.contr");

const router = Router();

//ruta get
router.get("/", obtenerSabores);

//ruta post
router.post("/", crearSabor);

module.exports = router;
