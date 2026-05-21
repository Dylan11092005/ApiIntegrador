const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class pedidoConsumibleModel {

    async getAllPedidosConsumibles() {
        try {
            return await db.query('CALL pa_SelectAllPedidoConsumible();')
        } catch (error) {
            console.error("Error en getAllPedidosConsumibles: ", error);
            throw error;
        }
    }

    async getPedidoConsumible(id) {
        try {
            return await db.query('CALL pa_SelectPedidoConsumible(?);', [id])
        } catch (error) {
            console.error("Error en getPedidoConsumible: ", error);
            throw error;
        }
    }

    async postPedidoConsumible(pedidoConsumible) {
        const { tipoComida,
            cantidadPersonas,
            idAlbergue,
            idUsuarioCreacion } = pedidoConsumible;
        try {
            return await db.query('CALL pa_InsertPedidoConsumible(?, ?, ?, ?);',
                [tipoComida,
                    cantidadPersonas,
                    idAlbergue,
                    idUsuarioCreacion]);
        } catch (error) {
            console.error("Error en postPedidoConsumible: ", error);
            throw error;
        }
    }

    async deletePedidoConsumible(id) {
        try {
            return await db.query('CALL pa_DeletePedidoConsumible(?);', [id]);
        }
        catch (error) {
            console.error("Error en deletePedidoConsumible: ", error);
            throw error;
        }
    }
}

module.exports = new pedidoConsumibleModel();