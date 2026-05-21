const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class referenciaModel {
    async getAllReferencia(){
        try {
            return await db.query('CALL pa_SelectAllReferencia();')
        }catch(error){
            console.error("Error en getAllReferencia: ", error);
            throw error;
        }
    }

    async getReferencia(id){
        try {
            return await db.query('CALL pa_SelectReferencia(?);', [id])
        }catch(error){
            console.error("Error en getReferencia: ", error);
            throw error;
        }
    }

    async postReferencia(referencia) {
        const { idFamilia, tipoAyuda, descripcion, fechaEntrega, responsable, idUsuarioCreacion } = referencia
        try {
            return await db.query('CALL pa_InsertReferencia(?, ?, ?, ?, ?, ?);', 
                [idFamilia, tipoAyuda, descripcion, fechaEntrega, responsable, idUsuarioCreacion])
        } catch (error) {
            console.error("Error en postReferencia: ", error);
            throw error;
        }
    }

    async deleteReferencia(id) {
        try {
            return await db.query('CALL pa_DeleteUbicacion(?);', [id])
        } catch (error) {
            console.error("Error en deleteUbicacion: ", error);
            throw error;
        }
    }
}

module.exports = new referenciaModel();