const { Router } = require("express");

const midDelToken = require("../controllers/funciones/comprobacionToken");
const crearRelleno = require("../controllers/rellenos/crearRelleno.contr");
const eliminarRelleno = require("../controllers/rellenos/eliminarRelleno.contr");
const obtenerRellenos = require("../controllers/rellenos/obtenerRellenos.contr");

const router = Router();

//rutas gets
router.get("/", obtenerRellenos);

//rutas post
router.post("/", midDelToken, crearRelleno);

//ruta delete
router.delete("/:id", midDelToken, eliminarRelleno);

module.exports = router;
