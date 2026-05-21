const pedidoConsumibleModel = require('../models/pedidoConsumibleModel');

const confirmarObligatorios = (objeto, obligatorios) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError("postProducto", new Error(`Falta el campo obligatorio '${campo}'`), 400);
        }
    }
}

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en productoService. " + lugar + ": ", error.message);
    throw error;
}

class pedidoConsumibleService {

    async getAllPedidosConsumibles() {
        try {
            const results = await pedidoConsumibleModel.getAllPedidosConsumibles();
            return results;
        } catch (error) {
            console.error("Error en pedidoConsumibleService.getAllPedidosConsumibles: ", error);
            throw error;
        }
    }

    async getPedidoConsumible(id) {
        try {
            const result = await pedidoConsumibleModel.getPedidoConsumible(id);
            return result;
        } catch (error) {
            console.error("Error en pedidoConsumibleService.getPedidoConsumible: ", error);
            throw error;
        }
    }


    async postPedidoConsumible(pedidoConsumible) {
        confirmarObligatorios(pedidoConsumible, ["tipoComida", "cantidadPersonas", "idAlbergue", "idUsuarioCreacion"]);
        try {
            const result = await pedidoConsumibleModel.postPedidoConsumible(pedidoConsumible);
            return result;
        } catch (error) {
            console.error("Error en pedidoConsumibleService.postPedidoConsumible: ", error);
            throw error;
        }
        
    }

    async deletePedidoConsumible(id) {
        try {
            const result = await pedidoConsumibleModel.deletePedidoConsumible(id);
            return result;
        }
        catch (error) {
            console.error("Error en pedidoConsumibleService.deletePedidoConsumible: ", error);
            throw error;
        }
    }

}

    
module.exports = new pedidoConsumibleService();