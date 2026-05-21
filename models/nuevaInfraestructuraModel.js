const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class nuevaInfraestructuraModel {
    
    async getAllNuevaInfraestructura(){
        try {
            return await db.query('CALL pa_SelectAllNuevaInfraestructura();')
        }catch(error){
            console.error("Error en getAllNuevaInfraestructura: ", error);
            throw error;
        }
    }

    async getNuevaInfraestructura(id){
        try {
            return await db.query('CALL pa_SelectNuevaInfraestructura(?);', [id])
        }catch(error){
            console.error("Error en getNuevaInfraestructura: ", error);
            throw error;
        }
    }

    async postNuevaInfraestructura(nuevaInfraestructura) {
        const { idAlbergue, fecha, motivo, tipo, descripcion, costoTotal } = nuevaInfraestructura
        try {
            return await db.query('CALL pa_InsertNuevaInfraestructura(?, ?, ?, ?, ?, ?);', 
                [idAlbergue, fecha, motivo, tipo, descripcion, costoTotal])
        } catch (error) {
            console.error("Error en postNuevaInfraestructura: ", error);
            throw error;
        }
    }

    async deleteNuevaInfraestructura(id) {
        try {
            return await db.query('CALL pa_DeleteNuevaInfraestructura(?);', [id])
        } catch (error) {
            console.error("Error en deleteNuevaInfraestructura: ", error);
            throw error;
        }
    }
}

module.exports = new nuevaInfraestructuraModel();