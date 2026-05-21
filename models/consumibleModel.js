const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class consumibleModel {

    async getAllConsumibles() {
        try {
            return await db.query('CALL pa_SelectAllConsumible();')
        } catch (error) {
            console.error("Error en getAllConsumibles: ", error);
            throw error;
        }
    }

    async getConsumible(id) {
        try {
            return await db.query('CALL pa_SelectConsumible(?);', [id])
        } catch (error) {
            console.error("Error en getConsumible: ", error);
            throw error;
        }
    }

    async postConsumible(consumible) {
        const { nombre, unidadMedidaNombre, categoriaNombre, cantidad } = consumible
        try {
            return await db.query('CALL pa_InsertConsumible(?, ?, ?, ?);',
                [nombre, unidadMedidaNombre, categoriaNombre, cantidad]);
        } catch (error) {
            console.error("Error en postConsumible: ", error);
            throw error;
        }
    }

    async deleteConsumible(id) {
        try {
            return await db.query('CALL pa_DeleteConsumible(?);', [id])
        } catch (error) {
            console.error("Error en deleteConsumible: ", error);
            throw error;
        }
    }
}

module.exports = new consumibleModel();