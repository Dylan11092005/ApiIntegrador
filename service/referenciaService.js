const referenciaModel = require('../models/referenciaModel.js');

const confirmarObligatorios = (objeto, obligatorios) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError("postReferencia", new Error(`Falta el campo obligatorio '${campo}'`), 400);
        }
    }
}

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en referenciaService. " + lugar + ": ", error.message);
    throw error;
}

class referenciaService {

    async getAllReferencia() {
        try {
            const result = await referenciaModel.getAllReferencia();
            return result;
        } catch (error) {
            console.error("Error en referenciaService.getAllReferencia: ", error);
            throw error;
        }
    }

    async getReferencia(id) {
        if (!id) {
            throw new Error('ID de referencia es requerido');
        }
        try {
            const result = await referenciaModel.getReferencia(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Referencia no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en referenciaService.getReferencia: ", error);
            throw error;
        }
    }

    async postReferencia(referencia) {
        confirmarObligatorios(referencia, ["idFamilia", "tipoAyuda", "fechaEntrega"]);
        try {
            const result = await referenciaModel.postReferencia(referencia);
            return result;
        } catch (error) {
            console.error("Error en referenciaService.postReferencia: ", error);
            throw error;
        }
    }

    async deleteReferencia(id) {
        if (!id) {
            throw new Error('ID de referencia es requerido');
        }
        try {
            const result = await referenciaModel.deleteReferencia(id);
            if (result[0].affectedRows === 0) {
                throw new Error('Referencia no encontrada o ya fue eliminada');
            }
            return result;
        } catch (error) {
            console.error("Error en referenciaService.deleteReferencia: ", error);
            throw error;
        }
    }
}
module.exports = new referenciaService();