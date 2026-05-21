const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class mascotaModel {

    async getAllMascotas() {
        try {
            return await db.query('CALL pa_SelectAllMascota();')
        } catch (error) {
            console.error("Error en getAllMascotas: ", error);
            throw error;
        }
    }

    async getMascota(id) {
        try {
            return await db.query('CALL pa_SelectMascota(?);', [id])
        } catch (error) {
            console.error("Error en getMascota: ", error);
            throw error;
        }
    }

    async postMascota(mascota) {
        const { idFamilia, tipo, tamaño, nombreMascota } = mascota;
        try {
            return await db.query('CALL pa_InsertMascota(?, ?, ?, ?);',
                [idFamilia, tipo, tamaño, nombreMascota]);
        }
        catch (error) {
            console.error("Error en postMascota: ", error);
            throw error;
        }
    }

    async deleteMascota(id) {
        try {
            return await db.query('CALL pa_DeleteMascota(?);', [id])
        } catch (error) {
            console.error("Error en deleteMascota: ", error);
            throw error;
        }
    }

    async getForMascotaFamilia(codigoFamilia) {
        try {
            return await db.query('CALL pa_BuscarMascotasPorCodigoFamilia(?);', [codigoFamilia])
        } catch (error) {
            console.error("Error al encontrar el mascota por codigo familia: ", error);
            throw error;
        }
    }
}

module.exports = new mascotaModel();