const { Router } = require("express");
// Importar todos los routers;

const products = require("./products");
const login = require("./login");
const categorias = require("./categorias");
const rellenos = require("./rellenos");
const sabores = require("./sabores");

const router = Router();

// Configurar los routers

router.use("/products", products);
router.use("/login", login);
router.use("/categorias", categorias);
router.use("/rellenos", rellenos);
router.use("/sabores", sabores);

module.exports = router;
