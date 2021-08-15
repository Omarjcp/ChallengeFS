const { Router } = require("express");

const obtenerCategorias = require("../controllers/obtenerCategorias.contr.js");

const router = Router();

//rutas gets
router.get("/", obtenerCategorias);

module.exports = router;
