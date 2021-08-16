const axios = require("axios");
const { Producto, Categoria } = require("../db.js");
const jwt = require("jsonwebtoken");

const crearProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      decimal,
      moneda,
      foto,
      estado,
      tipoProducto,
      fechaAlta,
      categoria,
    } = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (
          !nombre ||
          !descripcion ||
          !precio ||
          !decimal ||
          !moneda ||
          !estado ||
          !tipoProducto ||
          !fechaAlta ||
          !categoria
        ) {
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
                precio,
                decimal,
                moneda,
                foto,
                estado,
                tipoProducto,
                fechaAlta,
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
                precio,
                decimal,
                moneda,
                foto,
                estado,
                tipoProducto,
                fechaAlta,
                categoriumId: categoriaFiltrada.id,
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
