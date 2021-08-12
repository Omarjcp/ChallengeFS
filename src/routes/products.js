const { Router } = require("express");
const actualizarProducto = require("../controllers/actualizarProducto.contr.js");
const { crearProducto } = require("../controllers/crearProducto.contr.js");
const eliminarProducto = require("../controllers/eliminarProducto.contr.js");
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

//ruta put
router.put("/:id", actualizarProducto);

//ruta delete
router.delete("/:id", eliminarProducto);

module.exports = router;
