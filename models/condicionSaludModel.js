const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class condicionSaludModel {

    async getAllCondicionesSalud() {
        try {
            return await db.query('CALL pa_SelectAllCondicionSalud();')
        } catch (error) {
            console.error("Error en getAllCondicionesSalud: ", error);
            throw error;
        }
    }

    async getCondicionSalud(id) {
        try {
            return await db.query('CALL pa_SelectCondicionSalud(?);', [id])
        } catch (error) {
            console.error("Error en getCondicionSalud: ", error);
            throw error;
        }
    }

    async postCondicionSalud(condicionSalud) {
        const { descripcion, idCondicionesEspeciales } = condicionSalud
        try {
            return await db.query('CALL pa_InsertCondicionSalud(?, ?);',
                [descripcion, idCondicionesEspeciales]);
        } catch (error) {
            console.error("Error en postCondicionSalud: ", error);
            throw error;
        }
    }

    async deleteCondicionSalud(id) {
        try {
            return await db.query('CALL pa_DeleteCondicionSalud(?);', [id])
        } catch (error) {
            console.error("Error en deleteCondicionSalud: ", error);
            throw error;
        }
    }
}

module.exports = new condicionSaludModel();