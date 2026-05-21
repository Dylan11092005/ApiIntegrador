const usuarioModel = require('../models/usuarioModel');

const confirmarObligatorios = (objeto, obligatorios) => {
    if (typeof objeto !== 'object' || objeto == null || !Array.isArray(obligatorios)) throw new Error("No se pero si esto pasó algo esta muy mal.");
    for (const campo of obligatorios) {
        if (!objeto[campo]) {
            handleError("postPersonas", new Error(`Falta el campo obligatorio '${campo}'`), 400);
        }
    }
}

const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en PersonasService. " + lugar + ": ", error.message);
    throw error;
}

class usuarioService {
    async getAllUsuarios() {
        try {
            const result = await usuarioModel.getAllUsuarios();
            return result;
        } catch (error) {
            console.error("Error en usuarioService.getAllUsuarios: ", error);
            throw error;
        }
    }

    async getUsuario(id) {
        try {
            const result = await usuarioModel.getUsuario(id);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.getUsuario: ", error);
            throw error;
        }
    }

    async postUsuario(usuario) {

        confirmarObligatorios(usuario, ["nombreUsuario", "correo", "contrasenaHash", "rol", "activo", "idMunicipalidad", "identificacion"]);
        const result = await usuarioModel.postUsuario(usuario);
        return result;

    }

    async deleteUsuario(id) {
        try {
            const result = await usuarioModel.deleteUsuario(id);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.deleteUsuario: ", error);
            throw error;
        }

    }

    async validarCorreoMethod(correo) {
        try {
            const result = await usuarioModel.validarCorreoMethod(correo);
            return result;
        } catch (error) {
            console.error("Error en usuarioService.validarCorreoMethod: ", error);
            throw error;
        }
    }

    async putContrasenaMethod({ correo, nuevaContrasena }) {
        try {
            const usuario = await usuarioModel.validarCorreoMethod(correo);
            if (!usuario) throw new Error('Usuario no encontrado');
            const result = await usuarioModel.putConstrasenaMethod({ correo, contrasenaHash: nuevaContrasena });
            return result;
        } catch (error) {
            console.error("Error en usuarioService.putContrasenaMethod: ", error);
            throw error;
        }
    }
}

    
module.exports = new usuarioService();