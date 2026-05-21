const { request, response } = require("express");
const municipalidadService = require("../service/municipalidadService");

const getAllMunicipalidades = async (req = request, res = response) => {
  try {
    const results = await municipalidadService.getAllMunicipalidades();
    res.json({
      success: true,
      data: results[0],
    });
  } catch (error) {
    console.error("Error en getAllMunicipalidades:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener municipalidades",
    });
  }
};

const getMunicipalidad = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de municipalidad no proporcionado",
    });
  }
  try {
    const result = await municipalidadService.getMunicipalidad(id);
    if (!result || !result[0] || result[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Municipalidad no encontrada",
      });
    }
    res.json({
      success: true,
      data: result[0][0],
    });
  } catch (error) {
    console.error("Error en getMunicipalidad:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener municipalidad",
    });
  }
};

const postMunicipalidad = async (req, res) => {
  let {
    nombre,
    provincia,
    canton,
    distrito,
    direccion,
    telefono,
    correo,
    idUsuarioCreacion,
  } = req.body;

  try {
    await municipalidadService.postMunicipalidad({
      nombre,
      provincia,
      canton,
      distrito,
      direccion,
      telefono,
      correo,
      idUsuarioCreacion,
    });

    res.status(201).json({
      success: true,
      message: "Municipalidad insertada correctamente",
      data: {
        nombre,
        provincia,
        canton,
        distrito,
        direccion,
        telefono,
        correo,
        idUsuarioCreacion,
      },
    });
  } catch (error) {
    console.error("Error en postMunicipalidad:", error);
    if (error.message.includes("Faltan datos obligatorios")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error al insertar municipalidad",
      error: error.message,
    });
  }
};

const deleteMunicipalidad = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de municipalidad no proporcionado",
    });
  }
  try {
    const result = await municipalidadService.deleteMunicipalidad(id);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Municipalidad no encontrada o ya fue eliminada",
      });
    }
    res.json({
      success: true,
      message: `Municipalidad con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error en deleteMunicipalidad:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar municipalidad",
    });
  }
};

module.exports = {
  getAllMunicipalidades,
  getMunicipalidad,
  postMunicipalidad,
  deleteMunicipalidad,

};
