const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class categoriaConsumiblesModel {

    async getAllCategoriaConsumibles() {
        try {
            return await db.query('CALL pa_SelectAllCategoriaConsumible();')
        }
        catch (error) {
            console.error("Error en getAllCategoriaConsumibles: ", error);
            throw error;
        }
    }

    async getCategoriaConsumible(id) {
        try {
            return await db.query('CALL pa_SelectCategoriaConsumible(?);', [id])
        }
        catch (error) {
            console.error("Error en getCategoriaConsumibles: ", error);
            throw error;
        }
    }

    async postCategoriaConsumible(categoriaConsumibles) {
        const { nombre, idConsumible } = categoriaConsumible;
        try {
            return await db.query('CALL pa_InsertCategoriaConsumible(?, ?);', [nombre, idConsumible]);
        } catch (error) {
            console.error("Error en postCategoriaConsumible: ", error);
            throw error;
        }
       
    }

    async deleteCategoriaConsumible(id) {
        try {
            return await db.query('CALL pa_DeleteCategoriaConsumible(?);', [id]);
        }
        catch (error) {
            console.error("Error en deleteCategoriaConsumible: ", error);
            throw error;
        }
    }

    async deleteCategoriaConsumible(id) {
        try {
            return await db.query('CALL pa_DeleteCategoriaConsumible(?);', [id]);
        } catch (error) {
            console.error("Error en deleteCategoriaConsumible: ", error);
            throw error;
        }
    }
}

module.exports = new categoriaConsumiblesModel();