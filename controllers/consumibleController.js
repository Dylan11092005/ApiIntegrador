const { request, response } = require("express");
const consumibleService = require("../service/consumibleService");

const getAllConsumibles = async (req = request, res = response) => {
  try {
    const data = await consumibleService.getAllConsumibles();
    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllConsumibles:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los consumibles",
      error: error.message,
    });
  }
};

const getConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await consumibleService.getConsumible(id);
        res.json({
            success: true,
            data: result[0][0],
        });
    } catch (error) {
        console.error("Error en getConsumible:", error);
        if (error.message === 'Consumible no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al obtener el consumible",
        });
    }

};

const postConsumible = async (req = request, res = response) => {
    let { nombre, unidadMedidaNombre, categoriaNombre, cantidad } = req.body;
    try {
        const data = await consumibleService.postConsumible({ nombre, unidadMedidaNombre, categoriaNombre, cantidad });
        res.status(201).json({
            success: true,
            message: 'Consumible insertado correctamente',
            data: {
                id: data[0][0].id,
                nombre,
                unidadMedidaNombre,
                categoriaNombre,
                cantidad,
            },
        });
    } catch (error) {
        console.error("Error en postConsumible:", error);
        res.status(500).json({
            success: false,
            error: "Error al insertar el consumible",
        });
    }
};

const deleteConsumible = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de consumible no proporcionado",
    });
  }
  try {
    await consumibleService.deleteConsumible(id);
    res.json({
      success: true,
      message: `Consumible con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error en deleteConsumible:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar el consumible",
    });
  }
};

module.exports = {
  getAllConsumibles,
  getConsumible,
  postConsumible,
  deleteConsumible,
};
