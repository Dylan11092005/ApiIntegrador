const multer = require("multer");
const path = require("path");
const fs = require("node:fs");

// Filtro para aceptar solo imágenes .jpg o .png
const fileFilter = (req, file, cb) => {
  req.firma ??= {}; // Siempre inicializa
  const allowed = ["image/png"];
  if (!file) {
    req.firma.existe = false;
    cb(null,false);
  }
  if (allowed.includes(file.mimetype)) {
    req.firma.existe = true;
    cb(null, true);
  } else {
    req.firma.existe = false;
    cb(new Error("Solo se permiten imágenes JPG o PNG"), false);
  }
};

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ruta = path.join(__dirname, "..", "uploads");

    if (!fs.existsSync(ruta)) {
      fs.mkdirSync(ruta, { recursive: true });
    }
    req.firma.ruta = "uploads/"; // mantienes la ruta relativa si lo necesitas después
    cb(null, ruta);
  },
  filename: (req, file, cb) => {
    try {
      const nombre = `temporal_${Date.now()}${path.extname(file.originalname)}`;
      req.firma.nombre = nombre;
      cb(null, nombre);
    } catch (error) {
      cb(new Error("Error procesando personas para nombrar el archivo"));
    }
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;