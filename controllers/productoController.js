const { request, response } = require('express');
const productoService = require("../service/productoService");
const { pool } = require('../MySQL/basedatos')

const getAllProducto = async (req = request, res = response) => {
    try {
        const data = await productoService.getAllProducto();
        res.json({
            success: true,
            data: data[0],
            message: "Producto obtenida exitosamente",
        });
    } catch (error) {
        console.error('Error en getAllMethod:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener productos'
        });
    }
};

const getProducto = async (req = request, res = response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID de producto no proporcionado",
        });
    }
    try {
        const data = await productoService.getProducto(id);
        if (data[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }
        res.json({
            success: true,
            data: data[0][0]
        });
    } catch (error) {
        console.error('Error en getMethod:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener productos'
        });
    }
};

const postProducto = async (req, res) => {
    let {
        codigoProducto,
        nombre,
        descripcion = null,
        cantidad,
        categoria = null,
        unidadMedida = null,
        idAlbergue = null
    } = req.body;
    try {
        const data = await productoService.postProducto({ codigoProducto, nombre, descripcion, cantidad, categoria, unidadMedida, idAlbergue });
        res.json({
            success: true,
            message: 'Producto insertado correctamente',
            data: {
                id: data[0][0].id,
                codigoProducto,
                nombre,
                descripcion,
                cantidad,
                categoria,
                unidadMedida,
                idAlbergue
            }
        });
    } catch (error) {
        console.error("Error en postMethodTwo:", error);
        res.status(500).json({
            success: false,
            message: "Error al insertar producto",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}


const deleteProducto = async (req = request, res = response) => {
    const { id } = req.params;
    if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto no proporcionado en el body'
            });
        }
    try {
        const data = await productoService.deleteProducto(id);
        res.json({
            success: true,
            message: `Producto con ID ${id} eliminado correctamente`
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al eliminar producto'
        });
    }
};

const getForProductoFamilia = async (req = request, res = response) => {
  const { productoFamilia } = req.params;
  if (!productoFamilia) {
    return res.status(400).json({
      success: false,
      message: "Producto de familia es requerido",
    });
  }
  try {
    const data = await productoService.getForProductoFamilia(productoFamilia);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto de familia no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Producto de familia obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener producto de familia",
      error: error.message,
    });
  }
};

const putProducto = async (req = request, res = response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Se esperaba el parametro id en la query",
      });
  }
  try {
    const { id, descripcion, categoria, unidadMedida } = req.body;
    const data = await productoService.putProducto({ id, descripcion, categoria, unidadMedida });
    res.status(200).json({ success: true, message: "Todo salio bien" });
  } catch (error) {
    console.log("Error en putProducto; " + error.message, error);
    res.status(500).json({ success: false, message: "Error al actualizar producto: " + error.message });
  }
};

const getAllProductoPorUsuario = async (req = request, res = response) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({
      success: false,
      message: "Producto de familia es requerido",
    });
  }
  try {
    const data = await productoService.getAllProductoPorUsuario(idUsuario);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto de usuario no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Producto de usuario obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener producto de usuario",
      error: error.message,
    });
  }
};




module.exports = {
    getAllProducto,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto,
    getForProductoFamilia,
    getAllProductoPorUsuario
}