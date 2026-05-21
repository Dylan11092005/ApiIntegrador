const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();

class PersonasModel {
    async getAllPersonas() {
        try {
            const result = await db.query('CALL pa_SelectAllPersona()');
            return result;
        } catch (error) {
            console.error("Error fetching all personas:", error);
            throw error;
        }
    }

    async getAllPersonasByUsuario(idUsuario) {
        try {
            const result = await db.query('CALL pa_SelectAllPersonasPorUsuario(?)', [idUsuario]);
            return result;
        } catch (error) {
            console.error(`Error consiguiendo por ID Usuario ${idUsuario}:`, error);
            throw error;
        }
    }

    async getPersona(id) {
        try {
            const result = await db.query('CALL pa_SelectPersona(?)', [id]);
            return result[0];
        } catch (error) {
            console.error(`Error consiguiendo por ID ${id}:`, error);
            throw error;
        }
    }

    async postPersona(persona) {
        try {
            const result = await db.query('CALL pa_InsertPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    persona.tieneCondicionSalud,
                    persona.descripcionCondicionSalud,
                    persona.discapacidad,
                    persona.tipoDiscapacidad,
                    persona.subtipoDiscapacidad,
                    persona.paisOrigen,
                    persona.autoidentificacionCultural,
                    persona.puebloIndigena,
                    persona.firma ?? null,
                    persona.idFamilia,
                    persona.nombre,
                    persona.primerApellido,
                    persona.segundoApellido,
                    persona.tipoIdentificacion,
                    persona.numeroIdentificacion,
                    persona.nacionalidad,
                    persona.parentesco,
                    persona.esJefeFamilia,
                    persona.fechaNacimiento,
                    persona.genero,
                    persona.sexo,
                    persona.telefono,
                    persona.contactoEmergencia,
                    persona.observaciones,
                    persona.estaACargoMenor,
                    persona.usaMedicamentos,
                    persona.traeMedicamentos,
                    persona.idUsuarioCreacion,
                ]
            );
            return result.insertId;
        } catch (error) {
            console.error("Error insertando persona:", error);
            throw error;
        }
    }

    async deletePersona(id) {
        try {
            const result = await db.query('CALL pa_DeletePersona(?)', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error borrando por persona por ID ${id}:`, error);
            throw error;
        }
    }

    async getResumenPersonasPorAlbergue(nombreAlbergue) {
        try {
            const [results] = await db.query('CALL pa_ResumenPersonasPorAlbergue(?);', [nombreAlbergue]);
            return results;
        } catch (error) {
            console.error("Error en getResumenPersonasPorAlbergue: ", error);
            throw error;
        }

    }

    async getResumenPersonasPorSexo(idAlbergue, sexo) {
        try {
            const [results] = await db.query(
                "CALL pa_ResumenPersonasPorSexo(?,?);",
                [idAlbergue, sexo]
            );
            return results;
        } catch (error) {
            console.error("Error en getResumenPersonasPorSexo: ", error);
            throw error;
        }
    }

    async getResumenPersonasPorEdad(idAlbergue, edadMin, edadMax) {
        try {
            const [results] = await db.query(
                "CALL pa_ResumenPersonasPorEdad(?,?,?);",
                [idAlbergue, edadMin, edadMax]
            );
            return results;
        } catch (error) {
            console.error("Error en getResumenPersonasPorEdad: ", error);
            throw error;
        }
    }
    async getResumenDiscapacidad(idDiscapacidad) {
        try {
            const [results] = await db.query('CALL pa_ResumenDiscapacidad(?);', [idDiscapacidad]);
            return results;
        } catch (error) {
            console.error("Error en getResumenDiscapacidad: ", error);
            throw error;
        }
    }

    async getSelectRecursosPorPersona(idPersona) {
        try {
            const [results] = await db.query('CALL pa_SelectRecursosPorPersona(?);', [idPersona]);
            return results;
        } catch (error) {
            console.error("Error en getSelectRecursosPorPersona: ", error);
            throw error;
        }
    }

}
module.exports = new PersonasModel();