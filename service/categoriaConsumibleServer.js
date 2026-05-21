const categoriaConsumibleModel = require('../models/categoriaConsumibleModel');

class categoriaConsumibleService {
    async getAllcategoriaConsumibles() {
        try {
            const result = await categoriaConsumibleModel.getAllcategoriaConsumibles();
            return result;
        } catch (error) {
            console.error("Error en categoriaConsumibleService.getAllcategoriaConsumibles: ", error);
            throw error;
        }
    }

    async getcategoriaConsumible(id) {
        try {
            const result = await categoriaConsumibleModel.getcategoriaConsumible(id);
            return result;
        } catch (error) {
            console.error("Error en categoriaConsumibleService.getcategoriaConsumible: ", error);
            throw error;
        }
    }

    async postcategoriaConsumible(categoriaConsumible) {

        if (!categoriaConsumible.nombre || !categoriaConsumible.idConsumible ) {
            throw new Error('Faltan datos: nombre, idConsumible');
        }
        const result = await categoriaConsumibleModel.postcategoriaConsumible(categoriaConsumible);
        return result;

    }

    async deletecategoriaConsumible(id) {
        try {
            const result = await categoriaConsumibleModel.deletecategoriaConsumible(id);
            return result;
        } catch (error) {
            console.error("Error en categoriaConsumibleService.deletecategoriaConsumible: ", error);
            throw error;
        }

    }

}
    
module.exports = new categoriaConsumibleService();