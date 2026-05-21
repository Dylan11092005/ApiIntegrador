const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const inventarioService = require("../service/inventarioService")

const getAllInventario = async (req = request, res = response) => {
    try {
        const data = await inventarioService.getAllInventario();
        res.json({
            success: true,
            data: data[0],
            message: "Inventario obtenida exitosamente",
        });
    } catch (error) {
        console.error("Error en getAllMethod:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener el inventario",
        });
    }
};

const getInventario = async (req = request, res = response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID de inventario no proporcionado",
        });
    }
    try {
        const data = await inventarioService.getInventario(id);
        if (data[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Registro de inventario no encontrado",
            });
        }
        res.json({
            success: true,
            data: data[0][0],
        });
    } catch (error) {
        console.error("Error en getInventario:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener el registro de inventario",
        });
    }
};


const getResumenSuministros = async (req = request, res = response) => {
  const { idSuministros } = req.query;

  if (!idSuministros) {
    return res.status(400).json({
      success: false,
      error: "Se esperaban los parámetros idSuministros en la query",
    });
  }

  try {
    const data = await inventarioService.getResumenSuministros(idSuministros);

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron suministros especificado.",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error al obtener resumen por suministro:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener resumen por suministro: " + error.message,
    });
  }
};

const postInventario = async (req = request, res = response) => {
    const { idAlbergue, fecha, articulo, cantidad, estado, comentario } = req.body;
    try {
        const data = await inventarioService.postInventario(idAlbergue, fecha, articulo, cantidad, estado, comentario);
        res.json({
            success: true,
            message: "Inventario insertado correctamente",
            data: {
                id: data[0][0].id,
                idAlbergue,
                fecha,
                articulo,
                cantidad,
                estado,
                comentario,
            },
        });
    } catch (error) {
        console.error("Error al insertar inventario:", error);
        return res.status(500).json({
            success: false,
            error: "Error al insertar inventario",
        });
    }
};

const putInventario = (req = request, res = response) => {
    const { id, idAlbergue, fecha, articulo, cantidad, estado, comentario } = req.body;

    if (!id || !idAlbergue || !fecha || !articulo || !cantidad || !estado || !comentario) {
        return res.status(400).json({
            success: false,
            message: "Faltan datos para actualizar el inventario",
        });
    }

    pool.query(
        "CALL pa_UpdateInventario(?, ?, ?, ?, ?, ?, ?)",
        [id, idAlbergue, fecha, articulo, cantidad, estado, comentario],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar inventario:", error);
                return res.status(500).json({
                    success: false,
                    error: "Error al actualizar inventario",
                });
            }

            res.json({
                success: true,
                message: "Inventario actualizado correctamente",
                data: {
                    id,
                    idAlbergue,
                    fecha,
                    articulo,
                    cantidad,
                    estado,
                    comentario,
                },
            });
        }
    );
};

const deleteInventario = async (req = request, res = response) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID de inventario no proporcionado",
        });
    }
    try {
        const data = await inventarioService.deleteInventario(id);
        res.json({
            success: true,
            message: `Inventario con ID ${id} eliminado correctamente`,
        });
    } catch (error) {
        console.error("Error al eliminar inventario:", error);
        return res.status(500).json({
            success: false,
            error: "Error al eliminar inventario",
        });
    }
};
module.exports = {
    getAllInventario,
    getInventario,
    getResumenSuministros,
    postInventario,
    putInventario,
    deleteInventario,
};