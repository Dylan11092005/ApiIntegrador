const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class unidadMedidaModel {
    async getAllunidadMedidas() {
        try {
            return await db.query('CALL pa_SelectAllUnidadMedida();')
        } catch (error) {
            console.error("Error en getAllunidadMedidas: ", error);
            throw error;
        }
    }

    async getUnidadMedida(id) {
        try {           
            return await db.query('CALL pa_SelectUnidadMedida(?);', [id])
        } catch (error) {
            console.error("Error en getUnidadMedida: ", error);
            throw error;
        }
    }


    async postUnidadMedida(unidadMedida) {
        const { nombre, idConsumible } = unidadMedida;
        try {
            return await db.query('CALL pa_InsertUnidadMedida(?, ?);', 
                [nombre, idConsumible]);
        } catch (error) {
            console.error("Error en postUnidadMedida: ", error);
            throw error;
        }
    }


    async deleteUnidadMedida(id) {
        try {
            return await db.query('CALL pa_DeleteUnidadMedida(?);', [id]);
        } catch (error) {
            console.error("Error en deleteUnidadMedida: ", error);
            throw error;
        }
    }
}

module.exports = new unidadMedidaModel();