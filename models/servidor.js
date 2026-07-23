const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const swagger = require("../src/consts/swagger");
const publicRoutes = require("../routes/publicRoutes.route");
const authRoutes = require("../Auth/auth.route");
const authMiddleware = require("../middleware/authMiddleware");
const bienvenida = require("../src/consts/bienvenida");
const rutasProtegidas = require("../src/consts/rutas");

class Servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.authPath = "/api/auth";
    this.rutas = rutasProtegidas;

    this.configurarMiddlewares();
    this.configurarRutas();
    this.configurarManejoDeErrores();
  }

  configurarMiddlewares() {
    const origenesPermitidos = [
      "http://localhost:5173",
      "http://201.197.202.42",
      "https://integrador-front-chi.vercel.app",
      "http://192.168.0.10",
      "http://192.168.192.11",
    ];

    const corsOptions = {
      origin(origin, callback) {
        // Permite peticiones sin Origin, como Postman, Swagger o servidor a servidor.
        if (!origin || origenesPermitidos.includes(origin)) {
          return callback(null, true);
        }

        console.warn(`Origen bloqueado por CORS: ${origin}`);

        return callback(
          new Error(`El origen ${origin} no está permitido por CORS`)
        );
      },

      methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
      ],

      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "X-Requested-With",
        "X-CSRF-Token",
        "X-Client-Version",
        "X-User-ID",
        "Cache-Control",
        "Pragma",
      ],

      credentials: true,
      optionsSuccessStatus: 204,
    };

    // CORS debe registrarse antes de las rutas.
    this.app.use(cors(corsOptions));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(
      express.static(path.join(__dirname, "../public"))
    );
  }

  configurarRutas() {
    // Rutas públicas básicas.
    this.app.get("/", bienvenida);
    this.app.get("/api", bienvenida);

    // Swagger debe registrarse antes de rutas generales o protegidas.
    this.app.use(
      "/api/documentacion",
      swagger.serve,
      swagger.setup
    );

    // Autenticación y rutas públicas.
    this.app.use(this.authPath, authRoutes);
    this.app.use("/api/public", publicRoutes);

    // Archivos protegidos.
    this.app.use(
      "/firmas",
      authMiddleware,
      express.static(
        path.join(__dirname, "../uploads/firmas")
      )
    );

    // Rutas protegidas.
    this.rutas.forEach(({ path: routePath, route }) => {
      this.app.use(
        routePath,
        authMiddleware,
        route
      );
    });
  }

  configurarManejoDeErrores() {
    // Ruta no encontrada.
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `No existe la ruta ${req.method} ${req.originalUrl}`,
      });
    });

    // Manejador general de errores.
    this.app.use((error, req, res, next) => {
      console.error("Error del servidor:", error);

      if (error.message?.includes("no está permitido por CORS")) {
        return res.status(403).json({
          success: false,
          message: "Origen no permitido por CORS",
        });
      }

      return res.status(error.status || 500).json({
        success: false,
        message: "Error interno del servidor",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `El servidor está corriendo en el puerto ${this.port}`
      );
    });
  }
}

module.exports = Servidor;