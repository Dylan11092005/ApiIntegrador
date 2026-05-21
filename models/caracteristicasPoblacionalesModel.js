const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class caracteristicasPoblacionalesModel {
    async getAllcaracteristicasPoblacionales() {
        try {
            return await db.query('CALL pa_SelectAllCaracteristicasPoblacionales')
        } catch (error) {
            console.error("Error en getAllcaracteristicasPoblacionales: ", error);
            throw error;
        }
    }

    async getcaracteristicasPoblacionales() {
        try {
            return await db.query('CALL pa_InsertCaracteristicasPoblacionales(?, ?, ?)', [migrante, indigena, idPersona])
        } catch (error) {
            console.error("Error en getcaracteristicasPoblacionales: ", error);
            throw error;
        }
    }

    async postcaracteristicasPoblacionales(caracteristicasPoblacionales) {
        const { migrante, indigena, idPersona} = caracteristicasPoblacionales;
        try {
            return await db.query('CALL pa_InsertCaracteristicasPoblacionales(?, ?, ?);',
                [migrante, indigena, idPersona]);
        }
        catch (error) {
            console.error("Error en postcaracteristicasPoblacionales: ", error);
            throw error;
        }
    }


    async deletecaracteristicasPoblacionales(id) {
        try {
            return await db.query('CALL pa_DeleteCaracteristicasPoblacionales(?);', [id]);
        } catch (error) {
            console.error("Error en deletecaracteristicasPoblacionales: ", error);
            throw error;
        }

    }

    async putcaracteristicasPoblacionales(caracteristicasPoblacionales) {
        const { id, migrante, indigena, idPersona,  } = caracteristicasPoblacionales;
        try {
            const result = await db.query('CALL pa_UpdateCaracteristicasPoblacionales(?, ?, ?, ?)', [id, migrante, indigena, idPersona]);
            return result;
        } catch (error) {
            console.error("Error en putcaracteristicasPoblacionales: ", error);
            throw error;
        }
    }




}

module.exports = new caracteristicasPoblacionalesModel();