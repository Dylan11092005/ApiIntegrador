const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class detallePedidoConsumibleModel {

    async getAllDetallePedidoConsumible() {
        try {
            return await db.query('CALL pa_SelectAllDetallePedidoConsumible();');
        } catch (error) {
            console.error("Error en getAllDetallePedidoConsumible: ", error);
            throw error;
        }
    }

    async getDetallePedidoConsumible(detallePedidoConsumible) {
        const { id } = detallePedidoConsumible;
        try {
            return await db.query('CALL pa_SelectDetallePedidoConsumible(?);', [id]);
        } catch (error) {
            console.error("Error en getDetallePedidoConsumible: ", error);
            throw error;
        }
    }

    async postDetallePedidoConsumible(detallePedidoConsumible) {
        const { idPedido, idConsumible, cantidad } = detallePedidoConsumible;
        try {
            return await db.query('CALL pa_InsertDetallePedidoConsumible(?, ?, ?);', [idPedido, idConsumible, cantidad]);
        }
        catch (error) {
            console.error("Error en postDetallePedidoConsumible: ", error);
            throw error;
        }   
    }

    async deleteDetallePedidoConsumible(detallePedidoConsumible) {
        const { id } = detallePedidoConsumible;
        try {
            return await db.query('CALL pa_DeleteDetallePedidoConsumible(?);', [id]);
        } catch (error) {
            console.error("Error en deleteDetallePedidoConsumible: ", error);
            throw error;
        }   
    }
}
module.exports = new detallePedidoConsumibleModel();