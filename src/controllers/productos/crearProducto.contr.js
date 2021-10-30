const { Producto, Categoria, Relleno, Sabor } = require("../../db.js");
const jwt = require("jsonwebtoken");

const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, foto, estado, categoria, relleno, sabor } =
      req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (!nombre || !descripcion || !estado || !foto) {
          return res.status(404).json({
            message: "Todos los campos son obligatorios",
          });
        }

        //busco si existe algun producto con el mismo nombre para evitar su creacion
        let productoDb = await Producto.findOne({
          where: { nombre },
        });

        if (productoDb) {
          return res.json({
            msg: "Este producto ya existente",
          });
        } else {
          if (categoria || relleno || sabor) {
            let categoriaFiltrada = await Categoria.findOne({
              where: { nombre: categoria },
            });
            let rellenoFiltrado = await Relleno.findOne({
              where: { nombre: relleno },
            });
            let saborFiltrado = await Sabor.findOne({
              where: { nombre: sabor },
            });
            if (categoriaFiltrada || rellenoFiltrado || saborFiltrado) {
              let producto = await Producto.create({
                nombre,
                descripcion,
                foto,
                estado,
                categoriumId: categoriaFiltrada?.id,
                rellenoId: rellenoFiltrado?.id,
                saborId: saborFiltrado?.id,
              });

              res.json({
                msg: "Producto creado correctamente",
                data: producto,
              });
            }
          } else {
            res.json({
              msg: "El producto debe estar asosiado a una categoria, sabor o relleno",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al crear un nuevo producto", err);
  }
};

module.exports = {
  crearProducto,
};
