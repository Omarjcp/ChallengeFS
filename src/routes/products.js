const { Router } = require("express");

const actualizarProducto = require("../controllers/productos/actualizarProducto.contr.js");
const {
  crearProducto,
} = require("../controllers/productos/crearProducto.contr.js");
const eliminarProducto = require("../controllers/productos/eliminarProducto.contr.js");
const {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductoPorIdCategoria,
  obtenerProductoPorIdRelleno,
} = require("../controllers/productos/obtenerProductos.contr.js");
const midDelToken = require(".././controllers/funciones/comprobacionToken");

const router = Router();

//rutas gets
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);
// router.get("/categoria/:id", obtenerProductoPorIdCategoria);
// router.get("/relleno/:id", obtenerProductoPorIdRelleno);
// router.get("/sabor/:id", obtenerProductoPorIdSabor);

//ruta post
router.post("/", midDelToken, crearProducto);

//ruta put
router.put("/:id", midDelToken, actualizarProducto);

//ruta delete
router.delete("/:id", midDelToken, eliminarProducto);

module.exports = router;
