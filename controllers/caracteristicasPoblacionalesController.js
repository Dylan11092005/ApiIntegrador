const { request, response } = require('express');
const caracteristicasPoblacionalesService = require('../service/caracteristicasPoblacionalesService');

const getAllcaracteristicasPoblacionales = async (req = request, res = response) => {
  try {
    const data = await caracteristicasPoblacionalesService.getAllcaracteristicasPoblacionales();
    res.status(200).json({
      success: true,
      message: "Lista obtenida correctamente",
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener datos",
      error: error.message,
    });
  }
};

const getcaracteristicasPoblacionales = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido",
    });
  }

  try {
    const result = await caracteristicasPoblacionalesService.getcaracteristicasPoblacionales(id);
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
    console.error("Error en getcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener registro",
      error: error.message,
    });
  }
};

const postcaracteristicasPoblacionales = async (req = request, res = response) => {
  try {
    const datos = req.body;
    const result = await caracteristicasPoblacionalesService.postcaracteristicasPoblacionales(datos);

    const inserted = result[0]?.[0] || {};

    res.status(201).json({
      success: true,
      message: "Registro creado correctamente",
      data: {
        ...datos,
        id: inserted.id || null,
      },
    });
  } catch (error) {
    console.error("Error en postcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear registro",
      error: error.message,
    });
  }
};

const putcaracteristicasPoblacionales = async (req = request, res = response) => {
  const datos = req.body;

  if (!datos.id) {
    return res.status(400).json({
      success: false,
      message: "ID es obligatorio para actualizar",
    });
  }

  try {
    await caracteristicasPoblacionalesService.putcaracteristicasPoblacionales(datos);
    res.status(200).json({
      success: true,
      message: "Registro actualizado correctamente",
      data: datos,
    });
  } catch (error) {
    console.error("Error en putcaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar registro",
      error: error.message,
    });
  }
};

const deletecaracteristicasPoblacionales = async (req = request, res = response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID requerido para eliminar",
    });
  }

  try {
    await caracteristicasPoblacionalesService.deletecaracteristicasPoblacionales(id);
    res.status(200).json({
      success: true,
      message: `Registro con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error en deletecaracteristicasPoblacionales:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar registro",
      error: error.message,
    });
  }
};

module.exports = {
    getAllcaracteristicasPoblacionales,
    getcaracteristicasPoblacionales,
    postcaracteristicasPoblacionales,
    putcaracteristicasPoblacionales,
    deletecaracteristicasPoblacionales
}