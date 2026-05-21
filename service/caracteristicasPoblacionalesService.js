const caracteristicasPoblacionalesModel = require('../models/caracteristicasPoblacionalesModel');

class caracteristicasPoblacionalesService {
    async getAllcaracteristicasPoblacionales() {
        try {
            const result = await caracteristicasPoblacionalesModel.getAllcaracteristicasPoblacionales();
            return result;
        } catch (error) {
            console.error("Error en caracteristicasPoblacionalesService.getAllcaracteristicasPoblacionales: ", error);
            throw error;
        }
    }

    async getcaracteristicasPoblacionales(id) {
        try {
            const result = await caracteristicasPoblacionalesModel.getcaracteristicasPoblacionales(id);
            return result;
        } catch (error) {
            console.error("Error en caracteristicasPoblacionalesService.getcaracteristicasPoblacionales: ", error);
            throw error;
        }
    }

    async postcaracteristicasPoblacionales(caracteristicasPoblacionales) {

        if (!caracteristicasPoblacionales.migrante || !caracteristicasPoblacionales.indigena || !caracteristicasPoblacionales.idPersona) {
            throw new Error('Faltan datos: migrante, indigena, idPersona');
        }
        const result = await caracteristicasPoblacionalesModel.postcaracteristicasPoblacionales(caracteristicasPoblacionales);
        return result;

    }

    async deletecaracteristicasPoblacionales(id) {
        try {
            const result = await caracteristicasPoblacionalesModel.deletecaracteristicasPoblacionales(id);
            return result;
        } catch (error) {
            console.error("Error en caracteristicasPoblacionalesService.deletecaracteristicasPoblacionales: ", error);
            throw error;
        }

    }

    async putcaracteristicasPoblacionales(caracteristicasPoblacionales) {
        try {
            const result = await caracteristicasPoblacionalesModel.putcaracteristicasPoblacionales(caracteristicasPoblacionales);
            return result;
        } catch (error) {
            console.error("Error en caracteristicasPoblacionalesService.putcaracteristicasPoblacionales: ", error);
            throw error;
        }
    }

}

    
module.exports = new caracteristicasPoblacionalesService();