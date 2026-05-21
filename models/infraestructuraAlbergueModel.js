const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class infraestructuraAlbergueModel {
    async getAllInfraestructuraAlbergue(){
        try {
            return await db.query('CALL pa_SelectAllInfraestructuraAlbergue();')
        }catch(error){
            console.error("Error en getAllInfraestructuraAlbergue: ", error);
            throw error;
        }
    }

    async getInfraestructuraAlbergue(id){
        try {
            return await db.query('CALL pa_SelectInfraestructuraAlbergue(?);', [id])
        }catch(error){
            console.error("Error en getInfraestructuraAlbergue: ", error);
            throw error;
        }
    }

    async postInfraestructuraAlbergue(infraAlbergue) {
        const { cocina,duchas,servicios_sanitarios,bodega,menaje_mobiliario,tanque_agua,area_total_m2,idAlbergue } = infraAlbergue
        try {
            return await db.query('CALL pa_InsertInfraestructuraAlbergue(?, ?, ?, ?, ?, ?, ?, ?);', 
                [cocina,duchas,servicios_sanitarios,bodega,menaje_mobiliario,tanque_agua,area_total_m2,idAlbergue])
        } catch (error) {
            console.error("Error en postInfraestructuraAlbergue: ", error);
            throw error;
        }
    }

    async deleteInfraestructuraAlbergue(id) {
        try {
            return await db.query('CALL pa_DeleteInfraestructuraAlbergue(?);', [id])
        } catch (error) {
            console.error("Error en deleteInfraestructuraAlbergue: ", error);
            throw error;
        }
    }
}

module.exports = new infraestructuraAlbergueModel();