const { request, response } = require('express');
const detallePedidoConsumibleService = require('../service/detallePedidoConsumibleService');

const getAllDetallePedidoConsumibles = async (req = request, res = response) => {
    try {
        const data = await detallePedidoConsumibleService.getAllDetallePedidoConsumibles();
        res.status(200).json({
            success: true,
            data: data[0],
        });
    } catch (error) {
        console.error("Error en getAllDetallePedidoConsumibles:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los detalles de pedidos consumibles",
            error: error.message,
        });
    }
};

const getDetallePedidoConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await detallePedidoConsumibleService.getDetallePedidoConsumible(id);
        res.json({
            success: true,
            data: result[0][0],
        });
    } catch (error) {
        console.error("Error en getDetallePedidoConsumible:", error);
        if (error.message === 'Detalle no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al obtener el detalle de pedido consumible",
        });
    }
};

const postDetallePedidoConsumible = async (req = request, res = response) => {
    const { idPedido, idConsumible, cantidad } = req.body;
    
    console.log("=== DATOS RECIBIDOS ===");
    console.log("Body:", { idPedido, idConsumible, cantidad });
    
    if (!idPedido || !idConsumible || !cantidad) {
        return res.status(400).json({
            success: false,
            error: "Faltan datos obligatorios: idPedido, idConsumible, cantidad"
        });
    }
    
    try {
        const data = await detallePedidoConsumibleService.postDetallePedidoConsumible({ 
            idPedido: Number(idPedido), 
            idConsumible: Number(idConsumible), 
            cantidad: Number(cantidad) 
        });
        
        let insertedId = null;
        
        if (data && Array.isArray(data) && data.length > 0) {
            if (data[0] && Array.isArray(data[0]) && data[0].length > 0) {
                insertedId = data[0][0]?.id || data[0][0]?.Id;
                console.log("ID desde data[0][0]:", insertedId);
            }
            
            if (!insertedId && data[0] && typeof data[0] === 'object') {
                insertedId = data[0].insertId;
                console.log("ID desde data[0].insertId:", insertedId);
            }
            
            if (!insertedId && data[1] && typeof data[1] === 'object') {
                insertedId = data[1].insertId;
                console.log("ID desde data[1].insertId:", insertedId);
            }
        }
        
        if (!insertedId) {
            console.log(" No se pudo obtener ID, pero asumiendo inserción exitosa");
        }
        
        const responseData = {
            success: true,
            message: 'Detalle de pedido consumible insertado correctamente',
            id: insertedId,
            data: {
                id: insertedId,
                idPedido: Number(idPedido),
                idConsumible: Number(idConsumible),
                cantidad: Number(cantidad),
            },
        };
        console.log(JSON.stringify(responseData, null, 2));
        return res.status(201).json(responseData);
        
    } catch (error) {
        console.error(" Error al insertar detalle:", error);
        return res.status(500).json({
            success: false,
            error: error.message || "Error al insertar detalle de pedido consumible",
        });
    }
};

const deleteDetallePedidoConsumible = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await detallePedidoConsumibleService.deleteDetallePedidoConsumible(id);
        res.json({
            success: true,
            message: `Detalle de pedido consumible con ID ${id} eliminado correctamente`,
        });
    } catch (error) {
        console.error("Error al eliminar detalle de pedido consumible:", error);
        if (error.message === 'Detalle no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al eliminar detalle de pedido consumible",
        });
    }
};

module.exports = {
    getAllDetallePedidoConsumibles,
    getDetallePedidoConsumible,
    postDetallePedidoConsumible,
    deleteDetallePedidoConsumible,
}