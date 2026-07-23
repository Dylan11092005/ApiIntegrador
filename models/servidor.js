const express = require("express");
const cors = require("cors");
const path = require('path');
const swagger = require('../src/consts/swagger');
require("dotenv").config();
const publicRoutes = require('../routes/publicRoutes.route');
const authMiddleware = require('../middleware/authMiddleware');
const bienvenida = require("../src/consts/bienvenida");
const cookieParser = require('cookie-parser');

class servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.authPath = "/api/auth";
    this.rutas = require("../src/consts/rutas");
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.authPath, require("../Auth/auth.route"));
    this.app.use('/api/public', publicRoutes);
    this.rutas.forEach(({ path, route }) => {
    this.app.use(path, authMiddleware, route); 
    });
    this.app.use(
    "/firmas",
    authMiddleware,
    express.static(path.join(__dirname, "../uploads/firmas"))
    );
    this.app.use(
      "/api/documentacion",
      swagger.serve,
      swagger.setup
    );
    this.app.get("/", bienvenida);
    this.app.get("/api", bienvenida);
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "http://201.197.202.42",
          "https://front.integrador.dev",
          "http://192.168.0.10:80",
          "http://192.168.192.11:80",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Accept",
          "X-Requested-With",
          "X-CSRF-Token",
          "X-Client-Version",
          "X-User-ID",
          "Cache-Control",
          "Pragma"
        ],
        credentials: true
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  listen() {
    this.app.listen(this.port || 4000, () => {
      console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
  }
}
module.exports = servidor;