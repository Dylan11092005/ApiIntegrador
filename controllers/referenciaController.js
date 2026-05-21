const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");
const referenciaService = require("../service/referenciaService");

const getAllReferencia = async (req = request, res = response) => {
  try {
    const data = await referenciaService.getAllReferencia();
    res.json({
      success: true,
      data: data[0],
      message: "Referencia obtenida exitosamente",
    });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener referencias",
    });
  }
};

const getReferencia = async (req = request, res = response) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de referencia no proporcionado",
    });
  }
  try {
    const data = await referenciaService.getReferencia(id);
    if (data[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Referencia no encontrada",
      });
    }
    res.json({
      success: true,
      data: data[0][0],
    });
  } catch (error) {
    console.error("Error en getReferencia:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener referencia",
    });
  }
};

const postReferencia = async (req = request, res = response) => {
  let {
    idFamilia,
    tipoAyuda,
    descripcion,
    fechaEntrega,
    responsable = responsable ?? null,
    idUsuarioCreacion = idUsuarioCreacion ?? null,
  } = req.body;
  try {
    const data = await referenciaService.postReferencia({idFamilia, tipoAyuda, descripcion, fechaEntrega, responsable, idUsuarioCreacion});
    res.json({
      success: true,
      message: "Referencia insertada correctamente",
      data: {
        id: data[0][0].p_id,
        idFamilia,
        tipoAyuda,
        descripcion,
        fechaEntrega,
        responsable,
        idUsuarioCreacion,
      },
    });
  } catch (error) {
    console.error("Error al insertar categoria:", error);
    return res.status(500).json({
      success: false,
      error: "Error al insertar referencia",
    });
  }
};

const putReferencia = (req = request, res = response) => {
  const { id } = req.body;
  const {
    idFamilia,
    tipoAyuda,
    descripcion,
    fechaEntrega,
    responsable,
    idUsuarioCreacion,
    idUsuarioModificacion,
  } = req.body;

  if (
    !id ||
    idFamilia == null ||
    !tipoAyuda ||
    !descripcion ||
    !fechaEntrega ||
    !responsable ||
    idUsuarioCreacion == null ||
    idUsuarioModificacion == null
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Faltan datos: id, idFamilia, tipoAyuda, descripcion, fechaEntrega, responsable, idUsuarioCreacion, idUsuarioModificacion",
    });
  }

  pool.query(
    "CALL pa_UpdateReferencia(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      idFamilia,
      tipoAyuda,
      descripcion,
      fechaEntrega,
      responsable,
      idUsuarioCreacion,
      idUsuarioModificacion,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar categoria:", error);
        return res.status(500).json({
          success: false,
          error: "Error al actualizar referencia",
        });
      }

      res.status(200).json({
        success: true,
        message: "Referencia actualizado correctamente",
        data: {
          idFamilia,
          tipoAyuda,
          descripcion,
          fechaEntrega,
          responsable,
          idUsuarioCreacion,
          idUsuarioModificacion,
        },
      });
    }
  );
};

const deleteReferencia = async (req = request, res = response) => {
  const { id } = req.body;
  if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID de referencia no proporcionado",
      });
    }
  try {
    const data = await referenciaService.deleteReferencia(id);
    res.json({
      success: true,
      message: `Referencia con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar referencia:", error);
    return res.status(500).json({
      success: false,
      error: "Error al eliminar referencia",
    });
  }
};

module.exports = {
  getAllReferencia,
  getReferencia,
  postReferencia,
  putReferencia,
  deleteReferencia,
};
