const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const amenazasService = require("../service/amenazasService");

const getAllAmenazas = async (req = request, res = response) => {
  try {
    const data = await amenazasService.getAllAmenazas();
    res.status(200).json({
      success: true,
      message: "Amenazas obtenidas correctamente",
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllAmenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener amenazas",
      error: error.message,
    });
  }
};

const getAmenaza = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de amenaza no proporcionado",
    });
  }

  try {
    const result = await amenazasService.getAmenaza(id);
    const data = result[0][0];

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Amenaza no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error en getAmenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener amenaza",
      error: error.message,
    });
  }
};

const postAmenaza = async (req = request, res = response) => {
  const {
    familiaEvento,
    evento,
    peligro,
    idUsuarioCreacion,
    causa,
    categoriaEvento,
  } = req.body;

  try {
    await amenazasService.postAmenaza({
      familiaEvento,
      evento,
      peligro,
      idUsuarioCreacion,
      causa,
      categoriaEvento,
    });

    res.status(201).json({
      success: true,
      message: 'Amenaza insertada correctamente',
    });
  } catch (error) {
    console.error("Error en postAmenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al insertar amenaza",
      error: error.message,
    });
  }
};

const putAmenaza = async (req = request, res = response) => {
  const amenazaData = req.body;

  if (!amenazaData.id || !amenazaData.familiaEvento || amenazaData.evento == null || amenazaData.peligro == null) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos: id, familiaEvento, evento, peligro",
    });
  }

  try {
    await amenazasService.putAmenaza(amenazaData);
    res.status(200).json({
      success: true,
      message: "Amenaza actualizada correctamente",
      data: amenazaData,
    });
  } catch (error) {
    console.error("Error al actualizar amenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar amenaza",
      error: error.message,
    });
  }
};

const deleteAmenaza = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de amenaza no proporcionado",
    });
  }

  try {
    await amenazasService.deleteAmenaza(id);
    res.status(200).json({
      success: true,
      message: `Amenaza con ID ${id} eliminada correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar amenaza:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar amenaza",
      error: error.message,
    });
  }
};

const getSelectAmenazaPorPeligro = (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro peligro en la query" });
  }
  const { peligro } = req.params;
  amenazasService.getSelectAmenazaPorPeligro(peligro)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron amenazas coon el peligro especificado.",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error al obtener amenaza por peligro:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener amenaza por peligro; " + error.message,
      });
    });
}


module.exports = {
  getAllAmenazas,
  getAmenaza,
  postAmenaza,
  putAmenaza,
  deleteAmenaza,
  getSelectAmenazaPorPeligro,
};
