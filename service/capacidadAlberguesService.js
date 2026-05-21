const capacidadAlberguesModel = require('../models/capacidadAlberguesModel');

class capacidadAlberguesService {
    async getAllMethod() {
        try {
            const result = await capacidadAlberguesModel.getAllMethod();
            return result;
        } catch (error) {
            console.error("Error en capacidadAlberguesService.getAllMethod: ", error);
            throw error;
        }
    }

    async getMethod(id) {
        try {
            const result = await capacidadAlberguesModel.getMethod(id);
            return result;
        } catch (error) {
            console.error("Error en capacidadAlberguesService.getMethod: ", error);
            throw error;
        }
    }

    async postMethod(CapacidadAlbergue) {

        if (!CapacidadAlbergue.id || !CapacidadAlbergue.capacidad_personas || !CapacidadAlbergue.capacidad_colectiva 
            || !CapacidadAlbergue. cantidad_familias || !CapacidadAlbergue.ocupacion || !CapacidadAlbergue. egresos || !CapacidadAlbergue.sospechosos_sanos || !CapacidadAlbergue.otros) {
            throw new Error('Faltan datos: id, capacidad_personas, capacidad_colectiva, cantidad_familias, ocupacion, egresos, sospechosos_sanos, otros');
        }
        const result = await capacidadAlberguesModel.postMethod(CapacidadAlbergue);
        return result;

    }

    async deleteMethod(id) {
        try {
            const result = await capacidadAlberguesModel.deleteMethod(id);
            return result;
        } catch (error) {
            console.error("Error en capacidadAlberguesService.deleteMethod: ", error);
            throw error;
        }

    }

    async putMethod(CapacidadAlbergue) {
        try {
            const result = await capacidadAlberguesModel.putMethod(CapacidadAlbergue);
            return result;
        } catch (error) {
            console.error("Error en capacidadAlberguesService.putMethod: ", error);
            throw error;
        }
    }

}

    
module.exports = new capacidadAlberguesService();