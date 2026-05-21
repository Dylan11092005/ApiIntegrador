const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const condicionSaludService = require("../service/condicionSaludService");

const getAllCondicionesSalud = async (req = request, res = response) => {
  try {
    const data = await consumibleService.getAllCondicionesSalud();
    res.status(200).json({
      success: true,
      data: data[0], 
    });
  } catch (error) {
    console.error("Error en getAllCondicionesSalud:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la condiciones de salud",
      error: error.message,
    });
  }
};

const getCondicionSalud = async (req = request, res = response) => {
  const { id } = req.params;
      try {
          const result = await condicionSaludService.getCondicionSalud(id);
          res.json({
              success: true,
              data: result[0][0],
          });
      } catch (error) {
          console.error("Error en getCondicionSalud:", error);
          if (error.message === 'Condicion de salud no encontrado') {
              return res.status(404).json({
                  success: false,
                  message: error.message,
              });
          }
          res.status(500).json({
              success: false,
              error: "Error al obtener el condicion de salud",
          });
      }
};

const postCondicionSalud = async (req = request, res = response) => {
  let { descripcion, idCondicionesEspeciales } = req.body;
  try {
      const data = await condicionSaludService.postCondicionSalud({ descripcion, idCondicionesEspeciales });
      res.status(201).json({
          success: true,
          message: 'Condicion de salud insertada correctamente',
          data: {
              id: data[0][0].id,
              descripcion,
              idCondicionesEspeciales,
          },
      });
  } catch (error) {
      console.error("Error al insertar condicion de salud:", error);
      res.status(500).json({
          success: false,
          error: "Error al insertar condicion de salud",
      });
  }
}

const deleteCondicionSalud = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de condicion de salud no proporcionado",
    });
  }
  try {
    const data = await condicionSaludService.deleteCondicionSalud(id);
    res.json({
      success: true,
      message: `Condicion de salud con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar condicion de salud:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar condicion de salud",
    });
  }
};

module.exports = {
  getAllCondicionesSalud,
  getCondicionSalud,
  postCondicionSalud,
  deleteCondicionSalud,
};
