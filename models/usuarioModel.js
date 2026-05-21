const DbService = require('../MySQL/dbConfig');
const db = DbService.getDbServiceInstance();
class usuarioModel {
    async getAllUsuarios() {
        try {
            return await db.query('CALL pa_SelectAllUsuario();')
        } catch (error) {
            console.error("Error en getAllUsuario: ", error);
            throw error;
        }
    }

    async getUsuario(id) {
        try {
            return await db.query('CALL pa_SelectUsuario(?);', [id])
        } catch (error) {
            console.error("Error en getUsuario: ", error);
            throw error;
        }
    }

    async postUsuario(usuario) {
        const { nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion } = usuario;
        try {
            return await db.query('CALL pa_InsertUsuario(?, ?, ?, ?, ?, ?, ?);',
                [nombreUsuario, correo, contrasenaHash, rol, activo, idMunicipalidad, identificacion]);
        }
        catch (error) {
            console.error("Error en postUsuario: ", error);
            throw error;
        }
    }


    async deleteUsuario(id) {
        try {
            return await db.query('CALL pa_DeleteUsuario(?);', [id]);
        } catch (error) {
            console.error("Error en deleteMethod: ", error);
            throw error;
        }

    }

    async validarCorreoMethod(correo) {
        try {
            const result = await db.query('CALL pa_ValidarCorreo(?);', [correo]);
            return result;
        } catch (error) {
            console.error("Error en validarCorreoMethod: ", error);
            throw error;
        }
    }

    async putConstrasenaMethod(usuario) {
        const { correo, contrasenaHash } = usuario;
        try {
            const result = await db.query('CALL pa_UpdateUsuarioContrasena(?, ?);', [correo, contrasenaHash]);
            return result;
        } catch (error) {
            console.error("Error en putContrasenaMethod: ", error);
            throw error;
        }
    }

    
    async loginUsuario(usuario) {
        const { usuario: nombreUsuario, contrasena } = usuario;
        try {
            const result = await db.query('CALL pa_LoginUsuario(?, ?);', [nombreUsuario, contrasena]);
            return result;
        } catch (error) {
            console.error("Error en loginUsuario: ", error);
            throw error;
        }
    }
    
    async loginUsuarioDirecto(identificador, contrasena) {
        try {
            const query = `
                SELECT 
                    id as idUsuario,
                    nombreUsuario,
                    correo,
                    rol,
                    activo,
                    idMunicipalidad,
                    identificacion
                FROM Usuario
                WHERE (correo = ? OR nombreUsuario = ?) 
                    AND contrasenaHash = SHA2(?, 256)
                    AND activo = 1
            `;
            
            const result = await db.query(query, [identificador, identificador, contrasena]);
            console.log('Consulta directa resultado:', result);
            return result;
        } catch (error) {
            console.error("Error en loginUsuarioDirecto:", error);
            throw error;
        }
    }




}

module.exports = new usuarioModel();