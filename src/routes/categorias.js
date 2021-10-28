const { Router } = require("express");

const midDelToken = require("../controllers/funciones/comprobacionToken");

const {
  crearCategoria,
} = require("../controllers/categoria/crearCategoria.contr.js");
const obtenerCategorias = require("../controllers/categoria/obtenerCategorias.contr.js");
const eliminarCategoria = require("../controllers/categoria/eliminarCategoria.contr");

const router = Router();

//rutas gets
router.get("/", obtenerCategorias);

//rutas posts
router.post("/", midDelToken, crearCategoria);

//rutas delete
router.delete("/:id", midDelToken, eliminarCategoria);

module.exports = router;
