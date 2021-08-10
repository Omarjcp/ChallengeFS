const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    console.log("servidor arrancado! en el puerto 3001");
  });
});
