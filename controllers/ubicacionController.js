const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const ubicacionService = require("../service/ubicacionService");

const getAllUbicacion = async (req = request, res = response) => {
  try {
    const data = await ubicacionService.getAllUbicacion();
    res.json({
      success: true,
      data: data,
      message: "Ubicación obtenida exitosamente",
    });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener ubicaciones",
      error: error.message,
    });
  }
};

const getUbicacion = async (req = request, res = response) => {
  let { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de ubicación no proporcionado",
    });
  }
  try {
    const data = await productoService.postMethod(id);
    if (data[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ubicacion no encontrada",
      });
    }
    res.json({
      success: true,
      data: data[0][0],
    });
  } catch (error) {
    console.error("Error en getMethod:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener ubicacion",
    });
  };
};

const postUbicacion = async (req = request, res = response) => {
  let {
    provincia,
    canton,
    distrito,
    direccion,
    idFamilia = idFamilia ?? null,
    idAlbergue = idAlbergue ?? null,
    idMunicipalidad = idMunicipalidad ?? null,
  } = req.body;
  try {
    const data = await ubicacionService.postUbicacion(provincia, canton, distrito, direccion, idFamilia, idAlbergue, idMunicipalidad);
    res.json({
      success: true,
      message: 'Ubicación insertada correctamente',
      data: {
        id: data[0][0].id,
        provincia,
        canton,
        distrito,
        direccion,
        idFamilia,
        idAlbergue,
        idMunicipalidad
      }
    });
  } catch (error) {
    console.error("Error en postUbicacion:", error);
    res.status(500).json({
      success: false,
      message: "Error al insertar ubicación",
      error: error.message
    });
  };
};

const putUbicacion = (req = request, res = response) => {
  const { id } = req.body;
  const {
    provincia,
    canton,
    distrito,
    direccion,
    idFamilia,
    idAlbergue,
    idMunicipalidad,
  } = req.body;

  if (
    !id ||
    !provincia ||
    canton == null ||
    distrito == null ||
    direccion == null ||
    idFamilia == null ||
    idAlbergue == null ||
    idMunicipalidad == null
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan datos: provincia, canton, distrito, direccion, idFamilia, idAlbergue, idMunicipalidad",
    });
  }

  pool.query(
    "CALL pa_UpdateUbicacion(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      provincia,
      canton,
      distrito,
      direccion,
      idFamilia,
      idAlbergue,
      idMunicipalidad,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar ubicacion:", error);
        return res.status(500).json({
          success: false,
          error: "Error al actualizar ubicacion",
        });
      }

      res.status(200).json({
        success: true,
        message: "Ubicacion actualizada correctamente",
        data: {
          provincia,
          canton,
          distrito,
          direccion,
          idFamilia,
          idAlbergue,
          idMunicipalidad,
        },
      });
    }
  );
};

const deleteUbicacion = async (req = request, res = response) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de ubicación no proporcionado",
    });
  }
  try {
    const data = await ubicacionService.deleteUbicacion(id);
    res.json({
      success: true,
      message: `Ubicacion con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error en deleteUbicacion: ", error);
    return res.status(500).json({
      success: false,
      error: "Error al eliminar ubicación",
    });
  }
};

module.exports = {
  getAllUbicacion,
  getUbicacion,
  postUbicacion,
  putUbicacion,
  deleteUbicacion
};