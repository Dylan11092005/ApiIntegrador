const detallePedidoConsumibleModel = require('../models/detallePedidoConsumibleModel');

class detallePedidoConsumibleService {

    async getAllDetallePedidoConsumible() {
        try {
            const result = await detallePedidoConsumibleModel.getAllDetallePedidoConsumible();
            return result;
        } catch (error) {
            console.error("Error en detallePedidoConsumibleService.getAllDetallePedidoConsumible: ",
                error);
            throw error;
        }
    }

    async getDetallePedidoConsumible(detallePedidoConsumible) {
        try {
            const result = await detallePedidoConsumibleModel.getDetallePedidoConsumible(detallePedidoConsumible);
            return result;
        } catch (error) {
            console.error("Error en detallePedidoConsumibleService.getDetallePedidoConsumible: ", error
            );
            throw error;
        }
    }

    async postDetallePedidoConsumible(detallePedidoConsumible) {
        if (!detallePedidoConsumible.idPedido || !detallePedidoConsumible.idConsumible || !detallePedidoConsumible.cantidad) {
            throw new Error('Faltan datos obligatorios: idPedido, idConsumible, cantidad');
        }   
        try {
            const result = await detallePedidoConsumibleModel.postDetallePedidoConsumible(detallePedidoConsumible);
            return result;
        } catch (error) {
            console.error("Error en detallePedidoConsumibleService.postDetallePedidoConsumible: ", error);
            throw error;
        }
    }

    async deleteDetallePedidoConsumible(detallePedidoConsumible) {
        if (!detallePedidoConsumible.id) {
            throw new Error('ID de detalle de pedido consumible es requerido');
        }
        try {
            const result = await detallePedidoConsumibleModel.deleteDetallePedidoConsumible(detallePedidoConsumible);
            if (result[0].affectedRows === 0) {
                throw new Error('Detalle de pedido consumible no encontrado o ya fue eliminado');
            }
            return result;
        } catch (error) {
            console.error("Error en detallePedidoConsumibleService.deleteDetallePedidoConsumible: ", error);
            throw error;
        }
    }
}
module.exports = new detallePedidoConsumibleService();