const { Router } = require("express");
const { crearProducto } = require("../controllers/crearProducto.contr.js");
const router = Router();

const {
  obtenerProductos,
  obtenerProductoPorId,
} = require("../controllers/obtenerProductos.contr.js");

//rutas gets
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);
//ruta post
router.post("/", crearProducto);

module.exports = router;
