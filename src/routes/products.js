const { Router } = require("express");
const router = Router();

const {
  obtenerProductos,
} = require("../controllers/obtenerProductos.contr.js");

router.get("/", obtenerProductos);

module.exports = router;
