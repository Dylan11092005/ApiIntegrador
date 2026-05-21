const consumibleModel = require('../models/consumibleModel');

class consumibleService {

    async getAllConsumibles() {
        try {
            const result = await consumibleModel.getAllConsumibles();
            return result;
        } catch (error) {
            console.error("Error en consumibleService.getAllConsumibles: ", error);
            throw error;
        }
    }

    async getConsumible(id) {
        if (!id) {
            throw new Error('ID de consumible es requerido');
        }
        try {
            const result = await consumibleModel.getConsumible(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Consumible no encontrado');
            }
            return result;
        } catch (error) {
            console.error("Error en consumibleService.getConsumible: ", error);
            throw error;
        }
    }

    async postConsumible(consumible) {
        if (!consumible.nombre || !consumible.unidadMedidaNombre || !consumible.categoriaNombre || consumible.cantidad == null) {
            throw new Error('Faltan datos: nombre, unidadMedidaNombre, categoriaNombre, cantidad');
        }   
        try {
            const result = await consumibleModel.postConsumible(consumible);
            return result;
        } catch (error) {
            console.error("Error en consumibleService.postConsumible: ", error);
            throw error;
        }
    }

    async deleteConsumible(id) {
        if (!id) {
            throw new Error('ID de consumible es requerido');
        }
        try {
            const result = await consumibleModel.deleteConsumible(id);
            if (result[0].affectedRows === 0) {
                throw new Error('Consumible no encontrado o ya fue eliminado');
            }
            return result;
        } catch (error) {
            console.error("Error en consumibleService.deleteConsumible: ", error);
            throw error;
        }
    }
}
module.exports = new consumibleService();