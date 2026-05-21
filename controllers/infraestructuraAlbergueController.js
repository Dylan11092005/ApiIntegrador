const { request, response } = require('express');
const { pool } = require('../MySQL/basedatos')
const infraestructuraAlbergueService = require("../service/infraestructuraAlbergueService.js")

const getAllInfraestructuraAlbergue = async (req = request, res = response) => {
    try {
        const data = await infraestructuraAlbergueService.getAllInfraestructuraAlbergue();
        res.json({
            success: true,
            data: results[0]
        });
    } catch (error) {
        console.error('Error en getAllMethod:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener infraestructura'
        });
    }
};

const getInfraestructuraAlbergue = async (req = request, res = response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID del albergue es requerido'
        });
    }
    try {
        const data = await infraestructuraAlbergueService.getInfraestructuraAlbergue(id);
        if (data[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Infraestructura no encontrado'
            });
        }
        res.json({
            success: true,
            data: data[0][0]
        });
    } catch (error) {
        console.error('Error en getMethod:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener la infraestructura'
        });
    }
};

const postInfraestructuraAlbergue = async (req = request, res = response) => {
    let { cocina, duchas, servicios_sanitarios, bodega, menaje_mobiliario, tanque_agua, area_total_m2, idAlbergue } = req.body;
    if (!idAlbergue) {
        return res.status(400).json({
            success: false,
            message: 'ID del albergue es obligatorio'
        });
    }
    if (area_total_m2 == null) {
        return res.status(400).json({
            success: false,
            message: 'El área total en m² es obligatoria'
        });
    }
    try {
        const data = await infraestructuraAlbergueService.postInfraestructuraAlbergue(cocina, duchas, servicios_sanitarios, bodega, menaje_mobiliario, tanque_agua, area_total_m2, idAlbergue);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Ya existe una infraestructura con esos datos'
            });
        }
        res.status(201).json({
            success: true,
            message: 'Infraestructura del albergue insertada correctamente',
            data: {
                id: data[0][0].id,
                cocina,
                duchas,
                servicios_sanitarios,
                bodega,
                menaje_mobiliario,
                tanque_agua,
                area_total_m2,
                idAlbergue
            }
        });
    } catch (error) {
        console.error('Error al insertar infraestructura del albergue:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al insertar infraestructura del albergue',
            details: error.message
        });
    }
};

const putInfraestructuraAlbergue = async (req = request, res = response) => {
    const { id } = req.body;
    const { cocina, duchas, servicios_sanitarios, bodega, menaje_mobiliario, tanque_agua, area_total_m2 } = req.body;
    if (!id ||
        cocina == null || duchas == null || servicios_sanitarios == null || bodega == null || menaje_mobiliario == null || tanque_agua == null || area_total_m2 == null) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos: id, cocina, duchas, servicios_sanitarios, bodega, menaje_mobiliario, tanque_agua, area_total_m2'
        });
    }
    pool.query('CALL pa_UpdateInfraestructuraAlbergue(?, ?, ?, ?, ?, ?, ?, ?)',
        [id, cocina, duchas, servicios_sanitarios, bodega, menaje_mobiliario, tanque_agua, area_total_m2],
        (error, results) => {
            if (error) {
                console.error('Error al actualizar infraestructura del albergue:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error al actualizar infraestructura del albergue'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Infraestructura del albergue actualizada correctamente',
                data: {
                    id,
                    cocina,
                    duchas,
                    servicios_sanitarios,
                    bodega,
                    menaje_mobiliario,
                    tanque_agua,
                    area_total_m2
                }
            });
        }
    );
};

const deleteInfraestructuraAlbergue = async (req = request, res = response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID de infraestructura no proporcionado en el body'
        });
    }
    try {
        const data = await infraestructuraAlbergueService.deleteInfraestructuraAlbergue(id);
        res.json({
            success: true,
            message: `La infraestructura del albergue con ID ${id} eliminado correctamente`
        });
    } catch (error) {
        console.error('Error al eliminar la infraestructura:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al eliminar infraestructura'
        });
    }
};

module.exports = {
    getAllInfraestructuraAlbergue,
    getInfraestructuraAlbergue,
    postInfraestructuraAlbergue,
    putInfraestructuraAlbergue,
    deleteInfraestructuraAlbergue
}