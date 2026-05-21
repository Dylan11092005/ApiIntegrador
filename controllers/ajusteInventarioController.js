const { request, response } = require("express");
const ajusteInventarioService = require("../service/ajusteInventarioService");

const getAllAjusteInventarios = async (req = request, res = response) => {
  try {
    const data = await ajusteInventarioService.getAllAjusteInventario();
    res.status(200).json({
      success: true,
      message: 'Lista de ajustes obtenida correctamente',
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllAjuste:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los ajustes de inventario",
      error: error.message,
    });
  }
};

const getAjuste = async (req = request, res = response) => {
  const { id } = req.body;

  try {
    const data = await ajusteInventarioService.getAjuste(id); 
    res.status(200).json({
      success: true,
      message: 'Consulta de ajuste de inventario exitosa',
      data: data
    });
  } catch (error) {
    console.error("Error en getAjuste:", error);
    res.status(500).json({
      success: false,
      message: "Error al consultar el ajuste de inventario",
      error: error.message,
    });
  }
};

const postAjuste = async (req = request, res = response) => {
  const { idProducto, cantidadOriginal, cantidadAjustada, justificacion, idUsuarioCreacion } = req.body;

  try {
    const mensaje = await ajusteInventarioService.postAjusteInventario({
      idProducto,
      cantidadOriginal,
      cantidadAjustada,
      justificacion,
      idUsuarioCreacion,
    });

    res.status(201).json({
      success: true,
      message: mensaje.mensaje || "Ajuste registrado correctamente",
    });
  } catch (error) {
    console.error("Error en postAjuste:", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar el ajuste de inventario",
      error: error.message,
    });
  }
};

const getAjustesPorProducto = async (req = request, res = response) => {
  const { nombreProducto } = req.params;
  try {
    const data = await ajusteInventarioService.getAjustesPorProducto(nombreProducto);
    res.status(200).json({
      success: true,
      message: 'Lista de ajustes obtenida correctamente',
      data: data,
    });
  } catch (error) {
    console.error("Error en getAjustesPorProducto:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los ajustes de inventario",
      error: error.message,
    });
  }
}

module.exports = {
  getAllAjusteInventarios,
  getAjuste,
  postAjuste,
  getAjustesPorProducto
};