const { Producto, Categoria, Relleno, Sabor } = require("../../db");
const jwt = require("jsonwebtoken");

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombre, descripcion, foto, estado, categoria, relleno, sabor } =
      req.body;
    console.log(req.body);

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        //si recibo id
        if (id) {
          let productoDb = await Producto.findOne({
            where: { id },
          });

          //si no existe el producto en la DB
          if (!productoDb) {
            return res.json({
              msg: "Este producto no existente",
            });
            //si existe el producto
          } else {
            //si recibo categoria, relleno o sabor
            if (categoria || relleno || sabor) {
              //busco en la DB
              let categoriaDb = await Categoria.findOne({
                where: { nombre: categoria },
              });

              let rellenoDb = await Relleno.findOnd({
                where: { nombre: relleno },
              });

              let saborDb = await Sabor.findOne({
                where: { nombre: sabor },
              });
              //si no existe la categoria en la DB
              if (!categoriaDb || !rellenoDb || !saborDb) {
                res.json({
                  msg: "Categoria no existente en la DB.",
                });
                //si existe la categoria en la DB
              } else {
                //actualizo el producto con la categoria ya existente
                let productoActualizado = await Producto.update(
                  {
                    nombre: nombre === "" ? productoDb.nombre : nombre,
                    descripcion:
                      descripcion === "" ? productoDb.descripcion : descripcion,
                    foto: foto || productoDb.foto,
                    estado: estado || productoDb.estado,
                    categoriumId: categoriaDb?.id,
                    rellenoId: rellenoDb?.id,
                    saborId: saborDb?.id,
                  },
                  { where: { id } }
                );

                res.json({
                  msg: "Producto actualizado correctamente",
                  data: productoActualizado,
                });
              }
              //si no recibo la categoria
            } else {
              //actualizo el producto sin categoria asociada
              let productoActualizado = await Producto.update(
                {
                  nombre: nombre === "" ? productoDb.nombre : nombre,
                  descripcion:
                    descripcion === "" ? productoDb.descripcion : descripcion,
                  foto: foto || productoDb.foto,
                  estado: estado || productoDb.estado,
                },
                { where: { id } }
              );

              res.json({
                msg: "Producto actualizado correctamente",
                data: productoActualizado,
              });
            }
          }
        } else {
          res.json({
            msg: "Debe enviar el id del productio para actualizarlo",
          });
        }
      }
    });
  } catch (err) {
    console.log("No se pudo actualizar el producto", err);
  }
};

module.exports = actualizarProducto;
