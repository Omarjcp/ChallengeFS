const { Router } = require("express");
// Importar todos los routers;

const products = require("./products");
const login = require("./login");

const router = Router();

// Configurar los routers

router.use("/products", products);
router.use("/login", login);

module.exports = router;
