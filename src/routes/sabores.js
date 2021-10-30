const { Router } = require("express");

const midDelToken = require("../controllers/funciones/comprobacionToken");
const crearSabor = require("../controllers/sabores/crearSabor.contr");
const eliminarSabor = require("../controllers/sabores/eliminarSabor.contr");

const obtenerSabores = require("../controllers/sabores/obtenerSabores.contr");

const router = Router();

//ruta get
router.get("/", obtenerSabores);

//ruta post
router.post("/", midDelToken, crearSabor);

//ruta delete
router.delete("/:id", midDelToken, eliminarSabor);

module.exports = router;
