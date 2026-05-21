const infraestructuraAlbergueModel = require('../models/infraestructuraAlbergueModel.js');

class infraestructuraAlbergueService {

    async getAllInfraestructuraAlbergue() {
        try {
            const result = await infraestructuraAlbergueModel.getAllInfraestructuraAlbergue();
            return result;
        } catch (error) {
            console.error("Error en infraestructuraAlbergueService.getAllInfraestructuraAlbergue: ", error);
            throw error;
        }
    }

    async getInfraestructuraAlbergue(id) {
        if (!id) {
            throw new Error('ID de infraestructura es requerido');
        }
        try {
            const result = await infraestructuraAlbergueModel.getInfraestructuraAlbergue(id);
            if (!result || !result[0] || result[0].length === 0) {
                throw new Error('Infraestructura no encontrada');
            }
            return result;
        } catch (error) {
            console.error("Error en infraestructuraAlbergueService.getInfraestructuraAlbergue: ", error);
            throw error;
        }
    }

    async postInfraestructuraAlbergue(infraAlbergue) {
        if (infraestructura.cocina == null || infraestructura.duchas == null || infraestructura.servicios_sanitarios == null) {
            throw new Error('Faltan datos obligatorios: cocina, duchas, servicios_sanitarios');
        }

        if (infraestructura.bodega == null || infraestructura.menaje_mobiliario == null || infraestructura.tanque_agua == null) {
            throw new Error('Faltan datos obligatorios: bodega, menaje_mobiliario, tanque_agua');
        }
        try {
            const result = await infraestructuraAlbergueModel.postInfraestructuraAlbergue(infraAlbergue);
            return result;
        } catch (error) {
            console.error("Error en infraestructuraAlbergueService.postInfraestructuraAlbergue: ", error);
            throw error;
        }
    }

    async deleteInfraestructuraAlbergue(id) {
        if (!id) {
            throw new Error('ID de infraestructura es requerido');
        }
        try {
            const result = await infraestructuraAlbergueModel.deleteInfraestructuraAlbergue(id);
            if (result[0].affectedRows === 0) {
                throw new Error('Infraestructura no encontrada o ya fue eliminada');
            }
            return result;
        } catch (error) {
            console.error("Error en infraestructuraAlbergueService.deleteInfraestructuraAlbergue: ", error);
            throw error;
        }
    }
}
module.exports = new infraestructuraAlbergueService();