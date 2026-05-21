const productoModel = require('../models/productoModel');

const confirmarOpcionales = (objeto, opcionales) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(opcionales)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of opcionales) {
        if (objeto[campo] === undefined) {
            objeto[campo] = null;
        }
    }
}

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

class productoService {

    async getAllProducto() {
        try {
            const result = await productoModel.getAllProducto();
            return result;
        } catch (error) {
            handleError("getAllProducto", error);
        }
    }

    async getProducto(id) {
        if (!id) {
            throw new Error('ID de producto es requerido');
        }
        try {
            const result = await productoModel.getProducto(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Producto no encontrado');
            }
            return result;
        } catch (error) {
            handleError("getProducto", error);
        }
    }

    async postProducto(producto) {
        confirmarObligatorios(producto, ["codigoProducto", "nombre", "cantidad", "categoria", "unidadMedida"]);
        try {
            const result = await productoModel.postProducto(producto);
            return result;
        } catch (error) {
            handleError("postProducto", new Error("Faltan datos requeridos"), 400);
        }
        confirmarOpcionales(producto, ["descripcion, idAlbergue"]);
        try {
            const result = await producto.postProducto(producto);
            return result;
        } catch (error) {
            handleError("postProducto", error);
        }
    }
    async putProducto(producto) {
            if (!producto) {
                handleError("putProducto", new Error("No se recibió un producto", 400));
            }
            confirmarObligatorios(producto, ["id", "descripcion", "categoria", "unidadMedida"], "putProducto");
            try {
                const result = await productoModel.putProducto(producto);
                return result;
            } catch (error) {
                handleError("putProducto", error);
            }
        }

    async deleteProducto(id) {
        if (!id) {
            throw new Error('ID de producto es requerido');
        }
        try {
            const result = await productoModel.deleteProducto(id);
            return result;
        } catch (error) {
            handleError("deleteProducto", error);
        }
    }

    async getForProductoFamilia(productoFamilia) {
        try {
            const result = await productoModel.getForProductoFamilia(productoFamilia);
            return result;
        } catch (error) {
            handleError("getForProductoFamilia", error);
        }
    }

    async getAllProductoPorUsuario(idUsuario) {
        try {
            const result = await productoModel.getAllProductoPorUsuario(idUsuario);
            return result;
        } catch (error) {
            handleError("getForProductoPorUsuario", error);
        }
    }


}
module.exports = new productoService();