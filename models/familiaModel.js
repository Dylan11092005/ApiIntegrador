const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();

class familiaModel {
    async getAllFamilias() {
        try {
            return await db.query('CALL pa_SelectAllFamilia();');
        } catch (error) {
            console.error("Error en getAllFamilias: ", error);
            throw error;
        }
    }

    async getFamilia(id) {
        try {
            return await db.query('CALL pa_SelectFamilia(?);', [id])
        } catch (error) {
            console.error("Error en getFamilia: ", error);
            throw error;
        }
    }

    async postFamilia(familia) {
        try {
            return await db.query("CALL pa_InsertFamilia(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    familia.provincia,
                    familia.canton,
                    familia.distrito,
                    familia.direccion,
                    familia.codigoFamilia,
                    familia.cantidadPersonas,
                    familia.idAlbergue,
                    familia.idAmenaza,
                    familia.idPersona,
                    familia.idUsuarioCreacion,
                ]
            );
        } catch (error) {
            console.error("Error en postFamilia: ", error);
            throw error;
        }
    }

    async putEgresoFamilia(egreso) {
        try {
            return await db.query('CALL pa_UpdateFamilia(?,?);', [egreso.id, egreso.idModificacion]);
        } catch (error) {
            console.error("Error en putEgresoFamilia: ", error);
            throw error;
        }
    }

    async deleteFamilia(id) {
        try {
            return await db.query('CALL pa_DeleteFamilia(?);', [id])
        } catch (error) {
            console.error("Error en deleteFamilia: ", error);
            throw error;
        }
    }

    async getVistaFamiliaJefe(id) {
        try {
            return await db.query('SELECT * FROM vista_FamiliaConJefe WHERE id = ?', [id])
        } catch (error) {
            console.error("Error en getVistaFamiliaJefe: ", error);
            throw error;
        }
    }

    async getForCedulaJefe(cedula) {
        try {
            return await db.query('CALL pa_ObtenerFamiliasPorCedulaJefe(?)', [cedula])
        } catch (error) {
            console.error("Error en getForCedulaJefe: ", error);
            throw error;
        }
    }

    async getAllForCanton(canton) {
        try {
            return await db.query('CALL pa_SelectFamiliasPorCanton(?);', [canton]);
        } catch (error) {
            console.error("Error en getAllForCanton: ", error);
            throw error;
        }
    }

    async getObtenerReferenciasPorCodigoFamilia(codigoFamilia) {
        try {
            const [results] = await db.query('CALL ObtenerReferenciasPorCodigoFamilia(?);', [codigoFamilia]);
            return results[0] || [];
        } catch (error) {
            console.error("Error en getObtenerReferenciasPorCodigoFamilia: ", error);
            throw error;
        }
    }

    async getAllFamiliasPorUsuario(idUsuario) {
        try {
            return await db.query('CALL pa_SelectAllFamiliasPorUsuario(?);', [idUsuario]);
        } catch (error) {
            console.error("Error en getAllFamiliasPorUsuario: ", error);
            throw error;
        }
    }
}

module.exports = new familiaModel();