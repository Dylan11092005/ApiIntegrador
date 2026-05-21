const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const pedidoConsumibleService = require("../service/pedidoConsumibleService");

const getAllPedidosConsumibles = async (req = request, res = response) => {
  try {
    const data = await pedidoConsumibleService.getAllPedidosConsumibles();
    res.status(200).json({
      success: true,
      data: data,
      message: "Pedidos consumibles obtenidos exitosamente",
    });
  } catch (error) {
    console.error("Error en getAllPedidosConsumibles:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener pedidos consumibles",
      error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
    });
  }
};

const getPedidoConsumible = async (req = request, res = response) => {
  const { id } = req.params;  
  try {
    const data = await pedidoConsumibleService.getPedidoConsumible(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pedido consumible no encontrado", 
      });
    }
    res.status(200).json({
      success: true,
      data: data,
      message: "Pedido consumible obtenido exitosamente",
    });
  } catch (error) {
    console.error("Error en getPedidoConsumible:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener pedido consumible",
      error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
    });
  }
};


const postPedidoConsumible = async (req, res) => {
    let { 
        tipoComida, 
        cantidadPersonas,
        idAlbergue, 
        idUsuarioCreacion,
    } = req.body;

    try {
        const data = await pedidoConsumibleService.postPedidoConsumible({ tipoComida, cantidadPersonas, idAlbergue, idUsuarioCreacion });
        const insertedId = data[0][0].id || data[0][0].Id;
        res.status(201).json({
                success: true,
                message: 'Pedido insertado correctamente',
                id: insertedId,
                data: {
                    id: insertedId,
                    tipoComida,
                    cantidadPersonas,
                    idAlbergue,
                    idUsuarioCreacion
                    
                }
            });
    } catch (error) {
        console.error("Error en postPedidoConsumible:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar pedido consumible",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}

const deletePedidoConsumible = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID de pedido consumible no proporcionado en el body",
        });
    }
    try {
        const data = await pedidoConsumibleService.deletePedidoConsumible(id);  
        res.status(200).json({
            success: true,
            message: `Pedido consumible con ID ${id} eliminado correctamente`,
        });
    } catch (error) {
        console.error("Error al eliminar pedido consumible:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar pedido consumible",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
};

module.exports = {
  getAllPedidosConsumibles,
  getPedidoConsumible,
  postPedidoConsumible,
  deletePedidoConsumible,
};
