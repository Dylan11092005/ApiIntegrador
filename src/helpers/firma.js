const fs = require('fs').promises;
const path = require('path');

const ruta = "/firmas";
const rutaInterna = "uploads" + ruta;

const prepararFirma = async (firma, identificacion) => {
  const ext = ".png";
  const fecha = new Date().toISOString().slice(0, 10);
  const nombre = `${identificacion}-${fecha}${ext}`;

  const origen = path.join(firma.ruta, firma.nombre);
  const destino = path.join(rutaInterna, nombre);

  await fs.mkdir(rutaInterna, { recursive: true }); // Asegura que exista la carpeta
  await fs.rename(origen, destino); // Mueve el archivo

  firma.ruta = ruta;
  firma.nombre = nombre;
};

const eliminarTemporal = async (firma) => {
  try {
    const archivo = path.join(firma.ruta, firma.nombre); // ruta temporal

    await fs.unlink(archivo);
    console.log(`Archivo temporal eliminado: ${archivo}`);
  } catch (error) {
    if (error.code !== "ENOENT") { // ignoramos si no existe
      console.error("Error al eliminar archivo temporal:", error);
    }
  }
};

module.exports = { prepararFirma, eliminarTemporal };
