const mascotaModel = require('../models/mascotaModel');

class mascotaService {

    async getAllMascotas() {
        try {
            const result = await mascotaModel.getAllMascotas();
            return result;
        } catch (error) {
            console.error("Error en mascotaService.getAllMascotas: ", error);
            throw error;
        }
    }

    async getMascota(id) {
        if (!id) {
            throw new Error('ID de mascota es requerido');
        }
        try {
            const result = await mascotaModel.getMascota(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Mascota no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en mascotaService.getMascota: ", error);
            throw error;
        }

    }
    async postMascota(mascota) {
        if (!mascota.idFamilia || !mascota.tipo || !mascota.tamaño || !mascota.nombreMascota) {
            throw new Error('Faltan datos: idFamilia, tipo, tamaño, nombreMascota');
        }
        try {
            const result = await mascotaModel.postMascota(mascota);
            return result;
        } catch (error) {
            console.error("Error en mascotaService.postMascota: ", error);
            throw error;
        }
    }
    async deleteMascota(id) {
        if (!id) {
            throw new Error('ID de mascota es requerido');
        }
        try {
            const result = await mascotaModel.deleteMascota(id);
            if (result[0].affectedRows === 0) {
                throw new Error('Mascota no encontrada o ya fue eliminada');
            }
            return result;
        } catch (error) {
            console.error("Error en mascotaService.deleteMascota: ", error);
            throw error;
        }
    }

    async getForMascotaFamilia(codigoFamilia) {
            try {
                const result = await mascotaModel.getForMascotaFamilia(codigoFamilia);
                return result;
            } catch (error) {
                console.error("Error en mascotaModel.getForMascotaFamilia: ", error);
                throw error;
            }
        }
}
module.exports = new mascotaService();