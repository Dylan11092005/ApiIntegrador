const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class condicionEspecial {
    async getAllCondicionesEspeciales() {
        try {
            return await db.query('CALL pa_SelectAllCondicionEspecial();')
        } catch (error) {
            console.error("Error en getAllCondicionesEspeciales: ", error);
            throw error;
        }
    }

    async getCondicionEspecial(id) {
        try {
            return await db.query('CALL pa_SelectCondicionesEspeciales(?);', [id])
        } catch (error) {
            console.error("Error en getCondicionEspecial: ", error);
            throw error;
        }
    }
    async postCondicionEspecial(condicionEspecial) {
        const { idPersona,
            discapacidad,
            tipoDiscapacidad,
            subtipoDiscapacidad,
            tieneCondicionSalud,
            condicionSaludId, } = condicionEspecial
        try {
            return await db.query('CALL pa_InsertCondicionEspecial(?, ?, ?, ?, ?, ?);',
                [idPersona, discapacidad, tipoDiscapacidad, subtipoDiscapacidad, tieneCondicionSalud, condicionSaludId]);
        } catch (error) {
            console.error("Error en postCondicionEspecial: ", error);
            throw error;
        }

    }

    async deleteCondicionEspecial(id) {
        try {
            return await db.query('CALL pa_DeleteCondicionEspecial(?);', [id])
        } catch (error) {
            console.error("Error en deleteCondicionEspecial: ", error);
            throw error;
        }
    }


    async getResumenCondicionesEspeciales(idAlbergue) {
        try {
            const [results] = await db.query('CALL pa_ResumenCondicionesEspeciales(?);', [idAlbergue]);
            return results;
        } catch (error) {
            console.error("Error en getResumenCondicionesEspeciales: ", error);
            throw error;
        }
    }




    
}

module.exports = new condicionEspecial();