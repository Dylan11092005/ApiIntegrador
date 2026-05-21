const personasModel = require('../models/personasModel');
const path = require("path");
const helper = require('../src/helpers/firma');


const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en PersonasService. " + lugar + ": ", error.message);
    throw error;
}

const confirmarOpcionales = (objeto, opcionales) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(opcionales)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    const nulleados = [];
    for (const campo of opcionales) {
        if (objeto[campo] === undefined) {
            objeto[campo] = null;
            nulleados.push(campo);
        }
    }
    if (nulleados) console.warn(`Los siguientes campos fueron nulleados porque no estaban definidos: ${nulleados.join(', ')}`);
}

const confirmarBooleans = (objeto, indice, campos) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(campos)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of campos) {
        if (!objeto.hasOwnProperty(campo)) {
            handleError("postPersonas", new Error(`Falta el campo booleano obligatorio '${campo}'` + (indice ? ` en la persona #${indice}` : "")), 400);
        }
    }
}

const confirmarObligatorios = (objeto, indice, obligatorios) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError("postPersonas", new Error(`Falta el campo obligatorio '${campo}'` + (indice ? ` en la persona #${indice}` : "")), 400);
        }
    }
}

class PersonasService {

    async getAllPersonas() {
        try {
            const results = await personasModel.getAllPersonas();
            return results;
        } catch (error) {
            handleError("getAllPersonas", error);
        }
    }

    async getAllPersonasByUsuario(idUsuario = null) {
        if (idUsuario == null) {
            handleError("getAllPersonasByUsuario", new Error("El ID de usuario no puede ser nulo"), 400)
        }
        try {
            const result = await personasModel.getAllPersonasByUsuario(idUsuario)
            return result;
        } catch (error) {
            handleError("getPersonasByUsuario", error)
        }
    }

    async getPersona(id = null) {
        if (id === null) {
            handleError("getFamilia", new Error("El ID de la persona no puede ser nulo."), 400);
        }
        try {
            const result = await personasModel.getPersona(id);
            return result;
        } catch (error) {
            handleError("getPersona", error);
        }
    }

    async postPersonas(personas = null, firma = null) {
        if (!personas) {
            handleError("postPersonas", new Error("El array de personas no puede ser nulo."), 400);
        }
        personas = JSON.parse(personas);
        if (!Array.isArray(personas)) {
            handleError("postPersonas", new Error("Se esperaba un array de personas."), 400);
        }
        if (personas.length === 0) {
            handleError("postPersonas", new Error("El array de personas no puede estar vacío."), 400);
        }
        if (!firma || typeof firma !== 'object') {
            handleError("postPersonas", new Error("La firma debe ser un objeto con los campos 'ruta', 'nombre' y 'numeroIdentificacion'."), 400);
        }

        const resultados = [];
        const errores = [];

        const postPersona = async (persona, indice, firma = null) => {
            const camposObligatorios = [
                'idFamilia', 'nombre', 'primerApellido', 'segundoApellido',
                'tipoIdentificacion', 'numeroIdentificacion', 'nacionalidad',
                'parentesco', 'fechaNacimiento', 'genero', 'sexo', 'telefono',
                'estaACargoMenor', 'idUsuarioCreacion'
            ];
            const booleanosObligatorios = ['tieneCondicionSalud', 'discapacidad','usaMedicamentos','traeMedicamentos'];
            if (persona.firma) {
                persona.firma = null;
                console.warn("Alguien intentó usar mal firma");
            }
            confirmarObligatorios(persona, indice, camposObligatorios);
            confirmarBooleans(persona, indice, booleanosObligatorios);
            if (persona.esJefeFamilia === undefined || persona.esJefeFamilia === null) handleError("postPersonas", new Error(`Falta el campo obligatorio 'esJefeFamilia' en la persona #${indice}`), 400);
            if (persona.esJefeFamilia) {
                if (firma.existe !== true) console.warn("Esto no deberia pasar en la linea 100 de postPersonas");
                const camposfirma = ['ruta', 'nombre'];
                confirmarObligatorios(firma, null, camposfirma);
                await helper.prepararFirma(firma, persona.numeroIdentificacion);
                persona.firma = firma.ruta + '/' + firma.nombre;
            }
            confirmarOpcionales(persona, ['fechaNacimiento', 'fechaDefuncion']);
            const resultado = await personasModel.postPersona(persona);
            resultados.push({ success: true, resultado, indice });
        };

        for (let i = 0; i < personas.length; i++) {
            const persona = personas[i];
            try {
                if (typeof persona !== 'object' || persona === null) {
                    handleError("postPersonas", new Error("Cada elemento debe ser un objeto persona."), 400);
                }
                if (firma.existe && persona.esJefeFamilia === true) {
                    await postPersona(persona, i, firma);
                    firma = { existe: false };
                } else {
                    await postPersona(persona, i);
                }
            } catch (error) {
                resultados.push({ success: false, indice: i });
                errores.push({ indice: i, error: error.message });
            }
        }

        return { resultados, errores };
    }

    async deletePersona(id) {
        try {
            return await personasModel.deletePersona(id);
        } catch (error) {
            handleError("deletePersona", error);
        }
    }

    async getResumenPersonasPorAlbergue(nombreAlbergue = null) {
        if (!nombreAlbergue) {
            handleError("getResumenPersonasPorAlbergue", new Error("Falta el codigo de albergue"), 400);
        }
        try {
            const result = await personasModel.getResumenPersonasPorAlbergue(nombreAlbergue);
            return result;
        } catch (error) {
            handleError("getResumenPersonasPorAlbergue", error);
        }
    }
    async getResumenPersonasPorSexo(idAlbergue, sexo) {
        if (!idAlbergue || !sexo) {
            handleError(
                "getResumenPersonasPorSexo",
                new Error("Faltan parámetros idAlbergue o sexo"),
                400
            );
        }

        try {
            return await personasModel.getResumenPersonasPorSexo(idAlbergue, sexo);
        } catch (error) {
            handleError("getResumenPersonasPorSexo", error);
        }
    }

    async getResumenPersonasPorEdad(idAlbergue, edadMin, edadMax) {
        if (!idAlbergue || edadMin == null || edadMax == null) {
            handleError(
                "getResumenPersonasPorEdad",
                new Error("Faltan parámetros idAlbergue, edadMin o edadMax"),
                400
            );
        }
        try {
            return await personasModel.getResumenPersonasPorEdad(idAlbergue, edadMin, edadMax);
        } catch (error) {
            handleError("getResumenPersonasPorEdad", error);
        }
    }
    async getResumenDiscapacidad(idDiscapacidad = null) {
        if (!idDiscapacidad) {
            handleError("getResumenDiscapacidad", new Error("Falta el codigo de discapacidad"), 400);
        }
        try {
            const result = await personasModel.getResumenDiscapacidad(idDiscapacidad);
            return result;
        } catch (error) {
            handleError("getResumenDiscapacidad", error);
        }
    }

    async getSelectRecursosPorPersona(idPersona = null) {
            if (!idPersona) {
                handleError("getSelectRecursosPorPersona", new Error("Falta el codigo de idPersona"), 400);
            }
            try {
                const result = await personasModel.getSelectRecursosPorPersona(idPersona);
                return result;
            } catch (error) {
                handleError("getSelectRecursosPorPersona", error);
            }
        }

}

module.exports = new PersonasService();