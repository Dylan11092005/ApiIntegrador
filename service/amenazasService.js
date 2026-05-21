const amenazasModel = require('../models/amenazasModel');
const handleError = (lugar, error, status = null) => {
    if (status) error.flagStatus = status;
    console.error("Error en PersonasService. " + lugar + ": ", error.message);
    throw error;
}

class amenazasService {
    async getAllAmenazas() {
        try {
            const result = await amenazasModel.getAllAmenazas();
            return result;
        } catch (error) {
            console.error("Error en amenazasService.getAllAmenazas: ", error);
            throw error;
        }
    }

    async getAmenaza(id) {
        try {
            const result = await amenazasModel.getAmenaza(id);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.getAmenaza: ", error);
            throw error;
        }
    }

    async postAmenaza(Amenaza) {
        if (
            !Amenaza.familiaEvento ||
            !Amenaza.evento ||
            !Amenaza.peligro ||
            !Amenaza.idUsuarioCreacion ||
            !Amenaza.causa ||
            !Amenaza.categoriaEvento
        ) {
            throw new Error('Faltan datos: familiaEvento, evento, peligro, idUsuarioCreacion, causa o categoriaEvento');
        }

        await amenazasModel.postAmenaza(Amenaza); 
    }

    async deleteAmenaza(id) {
        try {
            const result = await amenazasModel.deleteAmenaza(id);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.deleteAmenaza: ", error);
            throw error;
        }

    }

    async putAmenaza(Amenaza) {
        try {
            const result = await amenazasModel.putAmenaza(Amenaza);
            return result;
        } catch (error) {
            console.error("Error en amenazasService.putAmenaza: ", error);
            throw error;
        }
    }

    async getSelectAmenazaPorPeligro(peligro = null) {
            if (!peligro) {
                handleError("getSelectAmenazaPorPeligro", new Error("Falta el codigo de peligro"), 400);
            }
            try {
                const result = await amenazasModel.getSelectAmenazaPorPeligro(peligro);
                return result;
            } catch (error) {
                handleError("getSelectAmenazaPorPeligro", error);
            }
        }


}


module.exports = new amenazasService();