const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const capacidadAlberguesService = require("../service/capacidadAlberguesService");

const getAllCapacidadAlbergue = async (req = request, res = response) => {
  try {
    const data = await capacidadAlberguesService.getAllCapacidadAlbergue();
    res.status(200).json({
      success: true,
      message: "Capacidades obtenidas correctamente",
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener capacidades",
      error: error.message,
    });
  }
};

const getCapacidadAlbergue = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido",
    });
  }

  try {
    const result = await capacidadAlberguesService.getCapacidadAlbergue(id);
    const data = result[0][0];

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Registro no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error en getCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener capacidad",
      error: error.message,
    });
  }
};

const postCapacidadAlbergue = async (req = request, res = response) => {
  try {
    const capacidadData = req.body;
    const result = await capacidadAlberguesService.postCapacidadAlbergue(capacidadData);

    const inserted = result[0]?.[0] || {};

    res.status(201).json({
      success: true,
      message: "Registro creado correctamente",
      data: {
         ...capacidadData,
        id: inserted.id || null, 
        idAlbergue: capacidadData.idAlbergue ?? null,
        sospechososSanos: capacidadData.sospechososSanos ?? null,
        otros: capacidadData.otros ?? null,
      },
    });
  } catch (error) {
    console.error("Error en postCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear registro",
      error: error.message,
    });
  }
};

const putCapacidadAlbergue = async (req = request, res = response) => {
  const capacidadData = req.body;

  if (!capacidadData.id) {
    return res.status(400).json({
      success: false,
      message: "ID es obligatorio para actualizar",
    });
  }

  try {
    await capacidadAlberguesService.putCapacidadAlbergue(capacidadData);
    res.status(200).json({
      success: true,
      message: "Registro actualizado correctamente",
      data: capacidadData,
    });
  } catch (error) {
    console.error("Error en putCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar registro",
      error: error.message,
    });
  }
};

const deleteCapacidadAlbergue = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido para eliminar",
    });
  }

  try {
    await capacidadAlberguesService.deleteCapacidadAlbergue(id);
    res.status(200).json({
      success: true,
      message: `Registro con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error en deleteCapacidadAlbergue:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar registro",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCapacidadAlbergue,
  getCapacidadAlbergue,
  postCapacidadAlbergue,
  putCapacidadAlbergue,
  deleteCapacidadAlbergue,
};
