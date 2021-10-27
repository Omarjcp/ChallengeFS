const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const port = process.env.PORT || 3001;

conn.sync({ alter: false }).then(() => {
  server.listen(port, async () => {
    console.log("servidor arrancado! en el puerto 3001");
  });
});
