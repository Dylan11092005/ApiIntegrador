const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')
const unidadMedidaService = require('../service/unidadMedidaService');


const getAllunidadMedidas = async (req, res) => {
  try{
    const data = await unidadMedidaService.getAllunidadMedidas();
    res.status(200).json({
        success: true,
        data: data,
        message: "Unidades obtenidos exitosamente",
    });
  }catch (error) {
    console.error("Error en getAllunidadMedidas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las unidades",
      error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
    });
  }
}

const getunidadMedida = async (req, res) => {
  const { id } = req.params;
    try {
        const data = await unidadMedidaService.getunidadMedida(id);
        if (data[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Unidad de medida no encontrada",
            });
        }
        res.json({
            success: true,
            data: data[0][0],
        });
    } catch (error) {
        console.error("Error en getunidadMedida:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener unidad de medida",
        });
    }
};

const postUnidadMedida = async (req, res) => {
    let { 
        nombre,
        idConsumible = null

    } = req.body;

    try {
        const data = await unidadMedidaService.postUnidadMedida({nombre, idConsumible});
        res.status(201).json({
                success: true,
                message: 'Unidad insertado correctamente',
                data: {
                    id: data[0][0].id,
                    nombre,
                    idConsumible
                }
            });
    } catch (error) {
        console.error("Error en postUnidadMedida:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar unidad de medida",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}

const deleteUnidadMedida = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de unidad de medida no proporcionado en el body'
        });
    }
    try {
        const result = await unidadMedidaService.deleteUnidadMedida(id);
        res.json({
            success: true,
            message: `Unidad de medida con ID ${id} eliminado correctamente`
        });
    } catch (error) {
        console.error('Error al eliminar unidad de medida:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al eliminar unidad de medida'
        });
    }
}

module.exports = {
    getAllunidadMedidas,
    getunidadMedida,
    postUnidadMedida,
    deleteUnidadMedida,
}