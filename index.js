const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

const n = Math.floor(Math.random() * (5 - 1)) + 1;

app.use(express.static(path.join(__dirname + "/assets")));

const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const usuario = req.params.usuario;
  usuarios.includes(usuario) ? next() : res.redirect("/who.jpeg");
});

app.get("/abracadabra/juego/:usuario", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/abracadabra/usuarios", function (req, res) {
  res.send({ usuarios });
});

app.get("/abracadabra/conejo/:n", function (req, res) {
  req.params.n == n
    ? res.redirect("/conejito.jpg")
    : res.redirect("/voldemort.jpg");
});

app.use((req, res) => {
  res.status(404);
  res.send("Esta página no existe");
});
