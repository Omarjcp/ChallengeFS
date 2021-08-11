const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const routes = require("./routes/index.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

// app.get("/", (req, res) => {
//   res.send("hola mundo");
// });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
