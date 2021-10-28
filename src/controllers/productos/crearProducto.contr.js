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
          if (categoria) {
            let categoriaFiltrada = await Categoria.findOne({
              where: { nombre: categoria },
            });
            if (!categoriaFiltrada) {
              const categoriaCreada = await Categoria.create({
                nombre: categoria,
              });

              let producto = await Producto.create({
                nombre,
                descripcion,
                foto,
                estado,
                categoriumId: categoriaCreada.id,
              });
              if (producto) {
                res.json({
                  msg: "producto creado correctamente",
                });
              }
            } else {
              let producto = await Producto.create({
                nombre,
                descripcion,
                foto,
                estado,
                categoriumId: categoriaFiltrada.id,
              });
              if (producto) {
                res.json({
                  msg: "producto creado correctamente",
                });
              }
            }
          } else if (relleno) {
            let rellenoEnDb = await Relleno.findOne({
              where: { nombre: relleno },
            });
            if (!rellenoEnDb) {
              let rellenoCreado = await Relleno.create({
                nombre: relleno,
              });

              let producto = await Producto.create({
                nombre,
                descripcion,
                foto,
                estado,
                rellenoId: rellenoCreado.id,
              });
              if (producto) {
                res.json({
                  msg: "producto creado correctamente",
                });
              }
            } else {
              let producto = await Producto.create({
                nombre,
                descripcion,
                foto,
                estado,
                rellenoId: rellenoEnDb.id,
              });
              if (producto) {
                res.json({
                  msg: "producto creado correctamente",
                });
              }
            }
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
