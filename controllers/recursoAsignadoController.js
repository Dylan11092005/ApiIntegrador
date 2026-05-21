const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')
const recursoAsignadoService = require('../service/recursoAsignadoService');

const getAllRecursosAsignados = async (req = request, res = response) => {
    try {
        const data = await recursoAsignadoService.getAllRecursosAsignados();
        res.status(200).json({
            success: true,
            data: data,
            message: "Recursos asignados obtenidos exitosamente",
        });
    } catch (error) {
        console.error("Error en getAllRecursosAsignados:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los recursos asignados",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
};

const getRecursoAsignado = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const data = await recursoAsignadoService.getRecursoAsignado(id);
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Recurso asignado no encontrado",
            });
        }
        res.json({
            success: true,
            data: data[0],
        });
    } catch (error) {
        console.error("Error en getRecursoAsignado:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener recurso asignado",
        });
    }
};

const postRecursoAsignado = async (req, res) => {
    let { 
        idProducto, 
        idPersona,
        cantidadAsignada
    } = req.body;

    try {
        const data = await recursoAsignadoService.postRecursoAsignado({ idProducto, idPersona, cantidadAsignada });
        
        res.status(201).json({
            success: true,
            message: 'Recurso insertado correctamente',
            data: {
                idProducto,
                idPersona,
                cantidadAsignada
            }
        });
    } catch (error) {
        console.error("Error en postRecursoAsignado:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar producto",
            error: error.message, 
        });
    }
};


const deleteRecursoAsignado = async (req, res) => {
    const { idProducto, idPersona } = req.body;
    if (!idProducto || !idPersona) {
        return res.status(400).json({
            success: false,
            message: 'Se requieren tanto idProducto como idPersona en el body'
        });
    }
    try {
        const result = await recursoAsignadoService.deleteRecursoAsignado(idProducto, idPersona
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron recursos asignados para eliminar con los IDs proporcionados'
            });
        }
        res.json({
            success: true,
            message: `Recurso asignado eliminado correctamente para Producto ID: ${idProducto} y Persona ID: ${idPersona}`,
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error("Error al eliminar recurso asignado:", error);
        return res.status(500).json({
            success: false,
            error: "Error al eliminar recurso asignado",
        });
    }
}

module.exports = {
    getAllRecursosAsignados,
    getRecursoAsignado,
    postRecursoAsignado,
    deleteRecursoAsignado
};