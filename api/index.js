const Servidor = require("../models/servidor.js");

const servidor = new Servidor();

module.exports = servidor.app;