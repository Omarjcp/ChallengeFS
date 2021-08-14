const { Producto } = require("../db.js");
const jwt = require("jsonwebtoken");

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        //si se recibe el id
        if (id) {
          //se busca el producto en la Db
          let productoDb = await Producto.findOne({
            where: { id },
          });
          //si no existe el producto en la Db
          if (!productoDb) {
            res.json({
              msg: "Este producto no existe",
            });
            //si el producto si existe
          } else {
            //se elimina el producto de la Db
            await Producto.destroy({
              where: { id },
            });

            res.json({
              msg: "Producto eliminado correctamente",
            });
          }
          //si no se recibe el id
        } else {
          res.json({
            msg: "Debe enviar el id del producto que se quiere eliminar",
          });
        }
      }
    });
  } catch (err) {
    console.log("No se pudo eliminar el producto", err);
  }
};

module.exports = eliminarProducto;
