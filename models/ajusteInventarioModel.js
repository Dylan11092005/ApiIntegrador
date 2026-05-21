const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class ajusteInventarioModel {

    async getAllAjustes() {
        try {
            return await db.query('CALL pa_SelectAllAjusteInventario();')
        } catch (error) {
            console.error("Error en getAllAjustes: ", error);
            throw error;
        }
    }

    async getAjuste(Inventario) {
        const { id } = Inventario
        try {
            return await db.query('CALL pa_SelectAjusteInventario(?)', [id])
        } catch (error) {
            console.error("Error en getAjuste: ", error);
            throw error;
        }
    }

    async postAjuste(Inventario) {
        const { idProducto, cantidadOriginal, cantidadAjustada, justificacion, idUsuarioCreacion } = Inventario;
        try {
            const result = await db.query('CALL pa_InsertAjusteInventario(?, ?, ?, ?, ?)',
                [idProducto, cantidadOriginal, cantidadAjustada, justificacion, idUsuarioCreacion])
            return result;
        } catch (error) {
            console.error("Error en postAjuste: ", error);
            throw error;
        }
    }


    async getAjustesPorProducto(Inventario) {
        const { nombreProducto } = Inventario;
        try {
            const result = await db.query('CALL ObtenerAjustesPorProducto(?)', [nombreProducto]);
            return result[0] || [];
        } catch (error) {
            console.error("Error en getAjustesPorProducto: ", error);
            throw error;
        }
    }



}
module.exports = new ajusteInventarioModel();