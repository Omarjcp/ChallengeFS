const { Router } = require("express");
const accesoUsuario = require("../controllers/login.contr");

const router = Router();

//ruta login
router.post("/", accesoUsuario);

module.exports = router;
