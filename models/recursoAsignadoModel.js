const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class recursoAsignadoModel {
    async getAllRecursosAsignados() {
        try {
            return await db.query('CALL pa_SelectAllRecursosAsignados();')
        } catch (error) {
            console.error("Error en getAllRecursosAsignados: ", error);
            throw error;
        }
    }

    async getRecursoAsignado(id) {
        try {
            return await db.query('CALL pa_SelectRecursosAsignados(?);', [id])
        }
        catch (error) {
            console.error("Error en getRecursoAsignado: ", error);
            throw error;
        }
    }

    async postRecursoAsignado(recursoAsignado) {
        const { idProducto, idPersona, cantidadAsignada } = recursoAsignado;
        try {
            return await db.query('CALL pa_InsertRecursosAsignados( ?, ?, ?);',
                [idProducto, idPersona, cantidadAsignada]);
        } catch (error) {
            console.error("Error en postRecursoAsignado: ", error);
            throw error;
        }
    }

    async deleteRecursoAsignado(id) {
        try {
            return await db.query('CALL pa_DeleteRecursosAsignados(?);', [id]);
        }
        catch (error) {
            console.error("Error en deleteRecursoAsignado: ", error);
            throw error;
        }
    }
}

module.exports = new recursoAsignadoModel();