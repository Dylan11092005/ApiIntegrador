const condicionSaludModel = require('../models/condicionSaludModel');

class condicionSaludService {

    async getAllCondicionesSalud() {
        try {
            const result = await condicionSaludModel.getAllCondicionesSalud();
            return result;
        } catch (error) {
            console.error("Error en condicionSaludService.getAllCondicionesSalud: ", error
            );
            throw error;
        }
    }

    async getCondicionSalud(id) {
        if (!id) {
            throw new Error('ID de condición de salud es requerido');
        }   
        try {
            const result = await condicionSaludModel.getCondicionSalud(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Condición de salud no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en condicionSaludService.getCondicionSalud: ", error);
            throw error;
        }
    }

    async postCondicionSalud(condicionSalud) {
        if (!condicionSalud.descripcion || !condicionSalud.idCondicionesEspeciales) {
            throw new Error('Faltan datos: descripcion, idCondicionesEspeciales');
        }
        try {
            const result = await condicionSaludModel.postCondicionSalud(condicionSalud);
            return result;
        } catch (error) {
            console.error("Error en condicionSaludService.postCondicionSalud: ", error);
            throw error;
        }
    }

    async deleteCondicionSalud(id) {
        if (!id) {
            throw new Error('ID de condición de salud es requerido');
        }
        try {
            const result = await condicionSaludModel.deleteCondicionSalud(id);
            if (result[0].affectedRows === 0) {
                throw new Error('Condición de salud no encontrada o ya fue eliminada');
            }
            return result;
        } catch (error) {
            console.error("Error en condicionSaludService.deleteCondicionSalud: ", error);
            throw error;
        }
    }
}
module.exports = new condicionSaludService();