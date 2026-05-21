const familiaModel = require("../models/familiaModel");

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en FamiliaService." + lugar + ": ", error.message);
    throw error;
}

const confirmarObligatorios = (objeto, obligatorios, lugar) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError(lugar, new Error(`Falta el campo obligatorio '${campo}'`), 400);
        }
    }
}

const confirmarOpcionales = (objeto, opcionales) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(opcionales)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of opcionales) {
        if (objeto[campo] === undefined) {
            objeto[campo] = null;
        }
    }
}

class familiaService {

    async getAllFamilias() {
        try {
            const results = await familiaModel.getAllFamilias();
            return results;
        } catch (error) {
            handleError("getAllFamilias", error);
        }
    }

    async getFamilia(id = null ) {
        if (!id) {
            handleError("getFamilia", new Error("Faltan datos requeridos"), 400);
        }
        try {
            const result = await familiaModel.getFamilia(id);
            return result;
        } catch (error) {
            handleError("getFamilia", error);
        }
    }

    async postFamilia(familia) {
        if (
            !familia.provincia ||
            !familia.canton ||
            !familia.distrito ||
            !familia.codigoFamilia ||
            familia.cantidadPersonas === undefined ||
            familia.idAlbergue === undefined ||
            familia.idAmenaza === undefined
        ) {
            handleError("postFamilia", new Error("Faltan datos requeridos"), 400);
        }
        confirmarOpcionales(familia, ["idPersona", "idUsuarioCreacion", "direccion"]);
        try {
            const result = await familiaModel.postFamilia(familia);
            const idFamilia = result[0][0]?.idFamilia;
        
        if (!idFamilia) {
            throw new Error('No se pudo obtener el ID de la familia insertada');
        }
        
        return { idFamilia };
        } catch (error) {
            handleError("postFamilia", error);
        }
    }

    async putEgresoFamilia(egreso) {
        if (!egreso) {
            handleError("putEgresoFamilia", new Error("No se recibió un egreso", 400));
        }
        confirmarObligatorios(egreso, ["id","idModificacion"], "putEgresoFamilia");
        try {
            const result = await familiaModel.putEgresoFamilia(egreso);
            return result;
        } catch (error) {
            handleError("putEgresoFamilia", error);
        }
    }

    async deleteFamilia(id = null) {
        if (!id) {
            handleError("deleteFamilia", new Error("Falta el id"), 400);
        }
        try {
            const result = await familiaModel.deleteFamilia(id);
            return result;
        } catch (error) {
            handleError("deleteFamilia", error);
        }
    }

    async getVistaFamiliaJefe(id = null){
        if (!id) {
            handleError("getVistaFamiliaJefe", new Error("Falta el id"), 400);
        }
        try {
            const result = await familiaModel.getVistaFamiliaJefe(id);
            return result;
        } catch (error) {
            handleError("getVistaFamiliaJefe",error)
        }
    }

    async getForCedulaJefe(cedula = null){
        if (!cedula) {
            handleError("getForCedulaJefe", new Error("Falta la cedula"), 400);
        }
        try {
            const result = await familiaModel.getForCedulaJefe(cedula);
            return result;
        } catch (error) {
            handleError("getForCedulaJefe",error)
        }
    }

    async generarIdentificador(canton = null) {
    if (!canton) {
        handleError("generarIdentificador", new Error("Falta el canton"), 400);
        return;
    }
    try {
        const data = await familiaModel.getAllForCanton(canton);
        const familias = data[0];

        if (familias === null || familias === undefined || !Array.isArray(familias)) {
            throw new Error("No se encontraron familias");
        }

        if (familias.length === 0) {
            return "001";
        }

        let max = 0;
        for (const familia of familias) {
            const codigo = familia.codigoFamilia; // ej: '2025-Guanacaste-Cañas-008'
            if (codigo) {
                const partes = codigo.split("-");
                const numerico = parseInt(partes[partes.length - 1], 10);
                if (!isNaN(numerico) && numerico > max) {
                    max = numerico;
                }
            }
        }

        const numero = max + 1;
        const identificador = String(numero).padStart(3, "0");

        return identificador;
    } catch (error) {
        handleError("generarIdentificador", error);
    }
}

    async getObtenerReferenciasPorCodigoFamilia(codigoFamilia = null) {
        if (!codigoFamilia) {
            handleError("getObtenerReferenciasPorCodigoFamilia", new Error("Falta el codigo de familia"), 400);
        }
        try {
            const result = await familiaModel.getObtenerReferenciasPorCodigoFamilia(codigoFamilia);
            return result;
        } catch (error) {
            handleError("getObtenerReferenciasPorCodigoFamilia", error);
        }
    }
    async getAllFamiliasPorUsuario(idUsuario = null) {
        if (!idUsuario) {
            handleError("getAllFamiliasPorUsuario", new Error("Falta el codigo de usuario"), 400);
        }
        try {
            const result = await familiaModel.getAllFamiliasPorUsuario(idUsuario);
            return result;
        } catch (error) {
            handleError("getAllFamiliasPorUsuario", error);
        }
    }
}
module.exports = new familiaService();