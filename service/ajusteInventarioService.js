const ajusteInventarioModel = require('../models/ajusteInventarioModel');

class ajusteInventarioService {

    async getAjusteInventario(Inventario) {

        if (!Inventario.IdInventario) {
            throw new Error('Faltan datos: id')
        }
        const result = await ajusteInventarioModel.getAjuste(Inventario);
        return result;

    }

    async postAjusteInventario(Inventario) {

        if (!Inventario.idProducto || !Inventario.justificacion || !Inventario.cantidadOriginal || !Inventario.cantidadAjustada || !Inventario.idUsuarioCreacion) {
            throw new Error('Faltan datos: idProducto, justificacion, cantidadOriginal, cantidadAjustada, idUsuarioCreacion')
        }
        const result = await ajusteInventarioModel.postAjuste(Inventario);
        return result;
    }

    async getAllAjusteInventario() {
        try {
            const result = await ajusteInventarioModel.getAllAjustes();
            return result;
        } catch (error) {
            console.error("Error en ajusteInventarioService.getAllMethod: ", error);
            throw error;
        }
    }
    async getAjustesPorProducto(nombreProducto) {
        if (!nombreProducto) {
            throw new Error('Faltan datos: nombreProducto');
        }
        const result = await ajusteInventarioModel.getAjustesPorProducto({ nombreProducto });
        return result;
    }
}
module.exports = new ajusteInventarioService();