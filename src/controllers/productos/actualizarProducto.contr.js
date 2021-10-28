const { Producto, Categoria } = require("../../db");
const jwt = require("jsonwebtoken");

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombre, descripcion, foto, estado, categoria } = req.body;
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
            //si recibo categoria
            if (categoria) {
              //busco en la DB
              let categoriaDb = await Categoria.findOne({
                where: { nombre: categoria },
              });
              //si no existe la categoria en la DB
              if (!categoriaDb) {
                //creo la categoiria
                let categoriaCreada = await Categoria.create({
                  nombre: categoria,
                });
                //actualizo el producto con la categoria recien creada
                await Producto.update(
                  {
                    nombre: nombre === "" ? productoDb.nombre : nombre,
                    descripcion:
                      descripcion === "" ? productoDb.descripcion : descripcion,
                    foto: foto || productoDb.foto,
                    estado: estado || productoDb.estado,
                    categoriumId: categoriaCreada.id,
                  },
                  { where: { id } }
                );

                res.json({
                  msg: "Producto actualizado, y categoria creada correctamente",
                });
                //si existe la categoria en la DB
              } else {
                //actualizo el producto con la categoria ya existente
                await Producto.update(
                  {
                    nombre: nombre === "" ? productoDb.nombre : nombre,
                    descripcion:
                      descripcion === "" ? productoDb.descripcion : descripcion,
                    foto: foto || productoDb.foto,
                    estado: estado || productoDb.estado,
                    categoriumId: categoriaDb.id,
                  },
                  { where: { id } }
                );

                res.json({
                  msg: "Producto actualizado correctamente",
                });
              }
              //si no recibo la categoria
            } else {
              //actualizo el producto sin categoria asociada
              await Producto.update(
                {
                  nombre: nombre === "" ? productoDb.nombre : nombre,
                  descripcion:
                    descripcion === "" ? productoDb.descripcion : descripcion,
                  foto: foto || productoDb.foto,
                  estado: estado || productoDb.estado,
                  fechaAlta,
                },
                { where: { id } }
              );

              res.json({
                msg: "Producto actualizado correctamente",
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
