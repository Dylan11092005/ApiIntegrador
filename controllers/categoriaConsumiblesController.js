const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')
const categoriaConsumibleService = require('../service/categoriaConsumibleServer');

const getAllCategoriaConsumibles = async (req = request, res = response) => {
    try {
        const data = await categoriaConsumibleService.getAllcategoriaConsumibles();
        res.status(200).json({
            success: true,
            message: "Lista obtenida correctamente",
            data: data[0],
        });
    } catch (error) {
        console.error("Error en getAllCategoriaConsumibles:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener datos",
            error: error.message,
        });
    }
};

const getCategoriaConsumible = async (req = request, res = response) => {
    const { id } = req.params;
        try {
            const result = await categoriaConsumibleService.getCategoriaConsumible(id);
            res.json({
                success: true,
                data: result[0][0],
            });
        } catch (error) {
            console.error("Error en getCategoriaConsumible:", error);
            if (error.message === 'Categoria no encontrada') {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
            res.status(500).json({
                success: false,
                error: "Error al obtener el categoria consumible",
            });
        }
    
    };

const postCategoriaConsumible = async (req = request, res = response) => {
    let { nombre, idConsumible } = req.body;
    try {
        const data = await categoriaConsumibleService.postcategoriaConsumible({ nombre, idConsumible });
        res.status(201).json({
            success: true,
            message: 'Categoria consumible insertado correctamente',
            data: {
                id: data[0][0].id,
                nombre,
                idConsumible
            },
        });
    } catch (error) {
        console.error("Error en postCategoriaConsumible:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar categoria consumible",
            error: error.message,
        });
    }
};

const deleteCategoriaConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await categoriaConsumibleService.deleteCategoriaConsumible(id);
        res.json({
            success: true,
            message: `Categoria consumible con ID ${id} eliminado correctamente`,
        });
    } catch (error) {
        console.error("Error en deleteCategoriaConsumible:", error);
        if (error.message === 'Categoria consumible no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al eliminar categoria consumible",
            error: error.message,
        });
    }
};

module.exports = {
    getAllCategoriaConsumibles,
    getCategoriaConsumible,
    postCategoriaConsumible,
    deleteCategoriaConsumible,
}