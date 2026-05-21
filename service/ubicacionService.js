const ubicacionModel = require('../models/ubicacionModel.js');

class ubicacionService {

    async getAllUbicacion() {
        try {
            const result = await ubicacionModel.getAllUbicacion();
            return result;
        } catch (error) {
            console.error("Error en ubicacionService.getAllUbicacion: ", error);
            throw error;
        }
    }

    async getUbicacion(id) {
        if (!id) {
            throw new Error('ID de ubicación es requerido');
        }
        try {
            const result = await ubicacionModel.getUbicacion(id);
            return result;
        } catch (error) {
            console.error("Error en ubicacionService.getUbicacion: ", error);
            throw error;
        }
    }

    async postUbicacion(ubicacion) {
        if (!ubicacion.provincia || !ubicacion.canton || !ubicacion.distrito || !ubicacion.direccion) {
            throw new Error('Faltan datos obligatorios: provincia, canton, distrito, direccion');
        }
        try {
            const result = await ubicacionModel.postUbicacion(ubicacion);
            return result;
        } catch (error) {
            console.error("Error en ubicacionService.postUbicacion: ", error);
            throw error;
        }
    }

    async deleteUbicacion(id) {
        if (!id) {
            throw new Error('ID de ubicación es requerido');
        }
        try {
            const result = await ubicacionModel.deleteUbicacion(id);
            if (result[0].affectedRows === 0) {
                throw new Error('Ubicación no encontrada o ya fue eliminada');
            }
            return result;
        } catch (error) {
            console.error("Error en ubicacionService.deleteUbicacion: ", error);
            throw error;
        }
    }
}
module.exports = new ubicacionService();