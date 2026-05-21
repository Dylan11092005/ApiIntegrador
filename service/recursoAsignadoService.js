const recursoAsignadoModel = require('../models/recursoAsignadoModel');

class recursoAsignadoService {

    async getAllRecursosAsignados() {
        try {
            const result = await recursoAsignadoModel.getAllRecursosAsignados();
            return result;
        } catch (error) {
            console.error("Error en recursoAsignadoService.getAllRecursosAsignados: ", error
            );
            throw error;
        }
    } 

    async getRecursoAsignado(id) {
        try {
            const result = await recursoAsignadoModel.getRecursoAsignado(id);
            return result;
        } catch (error) {
            console.error("Error en recursoAsignadoService.getRecursoAsignado: ", error);
            throw error;
        }
    } 
    async postRecursoAsignado(recursoAsignado) {
        if (!recursoAsignado.idProducto || !recursoAsignado.idPersona || !recursoAsignado.cantidadAsignada) {
            throw new Error('Faltan datos: idProducto, idPersona, cantidadAsignada');
        }
        try {
            const result = await recursoAsignadoModel.postRecursoAsignado(recursoAsignado);
            return result;
        } catch (error) {
            console.error("Error en recursoAsignadoService.postRecursoAsignado: ", error);
            throw error;
        }
    }
    async deleteRecursoAsignado(id) {
        try {
            const result = await recursoAsignadoModel.deleteRecursoAsignado(id);
            return result;
        }
        catch (error) {
            console.error("Error en recursoAsignadoService.deleteRecursoAsignado: ", error);
            throw error;
        }
    }
}

module.exports = new recursoAsignadoService();