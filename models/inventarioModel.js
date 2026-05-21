const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class inventarioModel {

    async getAllInventario() {
        try {
            return await db.query('CALL pa_SelectAllInventario();')
        } catch (error) {
            console.error("Error en getAllInventario: ", error);
            throw error;
        }
    }

    async getInventario(id) {
        try {
            return await db.query('CALL pa_SelectInventario(?);', [id])
        } catch (error) {
            console.error("Error en getInventario: ", error);
            throw error;
        }
    }

    async postInventario(inventario) {
        const { idAlbergue, fecha, articulo, cantidad, estado, comentario } = inventario
        try {
            return await db.query('CALL pa_InsertInventario(?, ?, ?, ?, ?, ?);',
                [idAlbergue, fecha, articulo, cantidad, estado, comentario])
        } catch (error) {
            console.error("Error en postInventario: ", error);
            throw error;
        }
    }

    async deleteInventario(inventario) {
        const { id } = inventario;
        try {
            return await db.query('CALL pa_DeleteInventario(?);', [id])
        } catch (error) {
            console.error("Error en deleteInventario: ", error);
            throw error;
        }
    }



    async getResumenSuministros(idSuministros) {
        try {
            const [results] = await db.query(
                "CALL pa_ResumenSuministros(?);",
                [idSuministros]
            );
            return results;
        } catch (error) {
            console.error("Error en getResumenSuministros: ", error);
            throw error;
        }
    }
}

module.exports = new inventarioModel();