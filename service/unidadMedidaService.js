const unidadMedidaModel = require('../models/unidadMedidaModel');

class unidadMedidaService {
    async getAllunidadMedidas() {
        try {
            const result = await unidadMedidaModel.getAllunidadMedidas();
            return result;
        } catch (error) {
            console.error("Error en unidadMedidaService.getAllunidadMedidas: ", error);
            throw error;
        }
    }

    async getUnidadMedida(id) {
        try {
            const result = await unidadMedidaModel.getUnidadMedida(id);
            return result;
        } catch (error) {
            console.error("Error en unidadMedidaService.getUnidadMedida: ", error);
            throw error;
        }
    }

    async postUnidadMedida(unidadMedida) {
        if (!unidadMedida.nombre || !unidadMedida.idConsumible) {
            throw new Error('Faltan datos: nombre, idConsumible');
        }
        try {
            const result = await unidadMedidaModel.postUnidadMedida(unidadMedida);
            return result;
        } catch (error) {
            console.error("Error en unidadMedidaService.postUnidadMedida: ", error);
            throw error;
        }
    }

    async deleteUnidadMedida(id) {
        try {
            const result = await unidadMedidaModel.deleteUnidadMedida(id);
            return result;
        } catch (error) {
            console.error("Error en unidadMedidaService.deleteUnidadMedida: ", error);
            throw error;
        }
    }


}

    
module.exports = new unidadMedidaService();