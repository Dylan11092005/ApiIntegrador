const albergueModel = require('../models/albergueModel');

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en PersonasService. " + lugar + ": ", error.message);
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

const confirmarActualizables = (objeto, actualizables, lugar) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(actualizables)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of actualizables) {
        if (objeto[campo] === undefined) {
            handleError(lugar, new Error(`Falta el campo actualizable '${campo}'`), 400);
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

const confirmarBooleans = (objeto, campos, lugar) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(campos)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of campos) {
        if (!objeto.hasOwnProperty(campo)) {
            handleError(lugar, new Error(`Falta el campo booleano obligatorio '${campo}'`), 400);
        }
    }
}

class albergueService {

    async getAllAlbergues() {
        try {
            const result = await albergueModel.getAllAlbergues();
            return result;
        } catch (error) {
            console.error("Error en albergueService.getAllAlbergues: ", error);
            throw error;
        }
    }

    async postAlbergue(Albergue) {

        const obligatorios = [
            'idAlbergue', 'nombre', 'region', 'provincia', 'canton', 'distrito', 'direccion',
            'tipoEstablecimiento', 'administrador', 'telefono', 'capacidadPersonas',
            'ocupacion', 'areaTotalM2', 'idMunicipalidad'
        ];

        const booleanosObligatorios = [
            'cocina', 'duchas', 'serviciosSanitarios', 'bodega',
            'menajeMobiliario', 'tanqueAgua'
        ];

        const opcionales = [
            'capacidadColectiva', 'cantidadFamilias', 'egresos', 'sospechososSanos', 'otros',
            'coordenadaX', 'coordenadaY', 'tipoAlbergue', 'condicionAlbergue', 'especificacion',
            'detalleCondicion', 'seccion', 'requerimientosTecnicos', 'costoRequerimientosTecnicos',
            'color', 'idPedidoAbarrote', 'idUsuarioCreacion'
        ];

        confirmarObligatorios(Albergue, obligatorios, 'postAblbergue');
        confirmarBooleans(Albergue, booleanosObligatorios, 'postAlbergue');
        confirmarOpcionales(Albergue, opcionales);
        try {
            const result = await albergueModel.postAlbergue(Albergue);
            return result;
        } catch (error) {
            console.error("Error en albergueService.postAlbergue: ", error);
            throw error;
        }
    }

    async getAlbergue(id) {
        try {
            const result = await albergueModel.getAlbergue(id);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getAlbergue: ", error);
            throw error;
        }
    }


    async deleteAlbergue(id) {
        try {
            const result = await albergueModel.deleteAlbergue(id);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.deleteAlbergue: ", error);
            throw error;
        }

    }

    async getForIdAlbergue(id) {
        try {
            const result = await albergueModel.getForIdAlbergue(id);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getForIdAlbergue: ", error);
            throw error;
        }
    }

    async getForNombreAlbergue(nombre) {
        try {
            const result = await albergueModel.getForNombreAlbergue(nombre);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getForNombreAlbergue: ", error);
            throw error;
        }
    }
    async getForDistritoAlbergue(distrito) {
        try {
            const result = await albergueModel.getForDistritoAlbergue(distrito);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getForDistritoAlbergue: ", error);
            throw error;
        }
    }
    async getForCantonAlbergue(canton) {
        try {
            const result = await albergueModel.getForCantonAlbergue(canton);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getForCantonAlbergue: ", error);
            throw error;
        }
    }
    async getForProvinciaAlbergue(provincia) {
        try {
            const result = await albergueModel.getForProvinciaAlbergue(provincia);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getForProvinciaAlbergue: ", error);
            throw error;
        }
    }

    async getResumenAlberguesColor(color) {
        try {
            const result = await albergueModel.getResumenAlberguesColor(color);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.ResumenAlberguesColor: ", error);
            throw error;
        }
    }

    async getAllAlberguesPorUsuario(idUsuario) {
        try {
            const result = await albergueModel.getAllAlberguesPorUsuario(idUsuario);
            return result;
        } catch (error) {
            console.error("Error en albergueModel.getAllAlberguesPorUsuario: ", error);
            throw error;
        }
    }

    async putAlbergueFamilia(albergueFa) {
        if (!albergueFa) {
            handleError("putAlbergueFamilia", new Error("No se recibió un albergue familia", 400));
        }
        confirmarObligatorios(albergueFa, ["idFamilia", "idAlbergue", "idUsuarioModificacion"], "putAlbergueFamilia");
        try {
            const result = await albergueModel.putAlbergueFamilia(albergueFa);
            return result;
        } catch (error) {
            handleError("putAlbergueFamilia", error);
        }
    }

    async putAlbergue(albergue) {
        if (!albergue) {
            handleError("putAlbergue", new Error("No se recibió un albergue", 400));
        }

        confirmarActualizables(
          albergue,
          [
            "id",
            "condicionAlbergue",
            "especificacion",
            "capacidadPersonas",
            "capacidadColectiva",
            "ocupacion",
            "detalleCondicion",
            "cocina",
            "duchas",
            "serviciosSanitarios",
            "bodega",
            "menajeMobiliario",
            "tanqueAgua",
            "administrador",
            "telefono",
            "color",
            "idUsuarioModificacion",
          ],
          "putAlbergue"
        );

        try {
            const result = await albergueModel.putAlbergue(albergue);
            return result;
        } catch (error) {
            handleError("putAlbergue", error);
        }
    }
}

module.exports = new albergueService();