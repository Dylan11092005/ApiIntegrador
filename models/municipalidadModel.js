const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class municipalidadModel {

    async getAllMunicipalidades() {
        try {
            return await db.query('CALL pa_SelectAllMunicipalidad();')
        }
        catch (error) {
            console.error("Error en getAllMunicipalidades: ", error);
            throw error;
        }
    }

    async getMunicipalidad(id) {
        try {
            return await db.query('CALL pa_SelectMunicipalidad(?);', [id])
        } catch (error) {
            console.error("Error en getMunicipalidad: ", error);
            throw error;
        }
    }

    async postMunicipalidad(municipalidad) {
        const { nombre,
            provincia,
            canton,
            distrito,
            direccion,
            telefono,
            correo,
            idUsuarioCreacion, } = municipalidad;
        try {
            return await db.query('CALL pa_InsertMunicipalidad(?, ?, ?, ?, ?, ?, ?, ?);',
                [nombre, provincia, canton, distrito, direccion, telefono, correo, idUsuarioCreacion]);
        } catch (error) {
            console.error("Error en postMunicipalidad: ", error);
            throw error;
        }
    }

    async deleteMunicipalidad(id) {
        try {
            return await db.query('CALL pa_DeleteMunicipalidad(?);', [id]);
        } catch (error) {
            console.error("Error en deleteMunicipalidad: ", error);
            throw error;
        }
    }
}

module.exports = new municipalidadModel();