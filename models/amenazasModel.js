const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class amanezasModel {
    async getAllAmenazas() {
        try {
            return await db.query('CALL pa_SelectAllAmenaza')
        } catch (error) {
            console.error("Error en getAllAmenaza: ", error);
            throw error;
        }
    }

    async getAmenaza(id) {
        try {
            return await db.query('CALL pa_SelectAmenaza(?);', [id])
        } catch (error) {
            console.error("Error en getAmenaza: ", error);
            throw error;
        }
    }

    async postAmenaza(Amenaza) {
        const {
            familiaEvento,
            evento,
            peligro,
            idUsuarioCreacion,
            causa,
            categoriaEvento,
        } = Amenaza;

        try {
            await db.query('CALL pa_InsertAmenaza(?, ?, ?, ?, ?, ?);', [
                familiaEvento,
                evento,
                peligro,
                idUsuarioCreacion,
                causa,
                categoriaEvento,
            ]);

            return;
        } catch (error) {
            console.error("Error en postAmenaza: ", error);
            throw error;
        }
    }


    async deleteAmenaza(id) {
        try {
            return await db.query('CALL pa_DeleteAmenaza(?);', [id]);
        } catch (error) {
            console.error("Error en deleteAmenaza: ", error);
            throw error;
        }

    }

    async putAmenaza(Amenaza) {
        const { id, familiaEvento, evento, peligro } = Amenaza;
        try {
            const result = await db.query('CALL pa_UpdateAmenaza(?, ?, ?, ?)', [id, familiaEvento, evento, peligro]);
            return result;
        } catch (error) {
            console.error("Error en putAmenaza: ", error);
            throw error;
        }
    }

    async getSelectAmenazaPorPeligro(peligro) {
        try {
            const [results] = await db.query('CALL pa_SelectAmenazaPorPeligro(?);', [peligro]);
            return results;
        } catch (error) {
            console.error("Error en getSelectAmenazaPorPeligro: ", error);
            throw error;
        }
    }




}







module.exports = new amanezasModel();