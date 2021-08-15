const { Router } = require("express");
// Importar todos los routers;

const products = require("./products");
const login = require("./login");
const categorias = require("./categorias");

const router = Router();

// Configurar los routers

router.use("/products", products);
router.use("/login", login);
router.use("/categorias", categorias);

module.exports = router;
