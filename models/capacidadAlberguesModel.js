const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class capacidadAlberguesModel {
    async getAllCapacidadAlbergue() {
        try {
            return await db.query('CALL pa_SelectAllCapacidadAlbergue()')
        } catch (error) {
            console.error("Error en getAllCapacidadAlbergue: ", error);
            throw error;
        }
    }

    async getCapacidadAlbergue(id) {
        try {
            return await db.query('CALL pa_SelectCapacidadAlbergue(?);', [id])
        } catch (error) {
            console.error("Error en getCapacidadAlbergue: ", error);
            throw error;
        }
    }

    async postCapacidadAlbergue(CapacidadAlbergue) {
        const { idAlbergue,
            capacidadPersonas,
            capacidadColectiva,
            cantidadFamilias,
            ocupacion,
            egresos,
            sospechososSanos,
            otros, } = CapacidadAlbergue;
        try {
            return await db.query('CALL pa_InsertCapacidadAlbergue(?, ?, ?, ?, ?, ?, ?, ?);',
                [
                    idAlbergue,
                    capacidadPersonas,
                    capacidadColectiva,
                    cantidadFamilias,
                    ocupacion,
                    egresos,
                    sospechososSanos,
                    otros,]);
        }
        catch (error) {
            console.error("Error en postCapacidadAlbergue: ", error);
            throw error;
        }
    }


    async deleteCapacidadAlbergue(id) {
        try {
            return await db.query('CALL pa_DeleteCapacidadAlbergue(?);', [id]);
        } catch (error) {
            console.error("Error en deleteCapacidadAlbergue: ", error);
            throw error;
        }

    }

    async putCapacidadAlbergue(CapacidadAlbergue) {
        const { id, capacidad_personas, capacidad_colectiva, cantidad_familias, ocupacion, egresos, sospechosos_sanos, otros,  } = CapacidadAlbergue;
        try {
            const result = await db.query('CALL pa_UpdateCapacidadAlbergue(?, ?, ?, ?, ?, ?, ?, ?)', [
                id,
                capacidad_personas,
                capacidad_colectiva,
                cantidad_familias,
                ocupacion,
                egresos,
                sospechosos_sanos,
                otros,
            ],);
            return result;
        } catch (error) {
            console.error("Error en putCapacidadAlbergue: ", error);
            throw error;
        }
    }
}

module.exports = new capacidadAlberguesModel();