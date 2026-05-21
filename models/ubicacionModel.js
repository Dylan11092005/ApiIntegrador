const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class ubicacionModel {
    async getAllUbicacion(){
        try {
            return await db.query('CALL pa_SelectAllUbicacion();')
        }catch(error){
            console.error("Error en getAllUbicacion: ", error);
            throw error;
        }
    }

    async getUbicacion(id){
        try {
            return await db.query('CALL pa_SelectUbicacion(?);', [id])
        }catch(error){
            console.error("Error en getUbicacion: ", error);
            throw error;
        }
    }

    async postUbicacion(ubicacion) {
        const { provincia, canton, distrito, direccion, idFamilia, idAlbergue, idMunicipalidad } = ubicacion
        try {
            return await db.query('CALL pa_InsertUbicacion(?, ?, ?, ?, ?, ?, ?);', 
                [provincia, canton, distrito, direccion, idFamilia, idAlbergue, idMunicipalidad])
        } catch (error) {
            console.error("Error en postUbicacion: ", error);
            throw error;
        }
    }

    async deleteUbicacion(id) {
        try {
            return await db.query('CALL pa_DeleteUbicacion(?);', [id])
        } catch (error) {
            console.error("Error en deleteUbicacion: ", error);
            throw error;
        }
    }
}

module.exports = new ubicacionModel();