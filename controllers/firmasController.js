const { request, response } = require("express");
const { pool } = require("../MySQL/basedatos");

const getAllMethod = (req = request, res = response) => {
  pool.query("CALL pa_SelectAllFirmaDigital", (error, results) => {
    if (error) {
      console.error("Error en getAllMethod:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener la firma digital",
      });
    }

    res.json({
      success: true,
      data: results[0],
    });
  });
};

const getMethod = (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Falta dato requerido: firma",
    });
  }
  pool.query("CALL pa_SelectFirmaDigital(?)", [id], (error, results) => {
    if (error) {
      console.error("Error en getMethod:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener la firma",
      });
    }

    if (results[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "Firma no encontrado",
      });
    }

    res.json({
      success: true,
      data: results[0][0],
    });
  });
};

const postMethod = (req = request, res = response) => {
  let { idPersona, firma } = req.body;

  if (firma.startsWith("data:")) {
    firma = firma.split(",")[1];
  }
  
  firma = Buffer.from(firma, "base64");
  if (!firma) {
    return res.status(400).json({
      success: false,
      message: "Falta dato requerido: firma",
    });
  }
  if (firma.length === 0) {
    return res.status(400).json({
      success: false,
      message: "La firma no puede estar vacia",
    });
  }
  idPersona = idPersona ?? null;
  pool.query(
    "CALL pa_InsertFirmaDigital(?, ?)",
    [idPersona, firma],
    (error, results) => {
      if (error) {
        console.error("Error al insertar firma digital:", error);
        if (error.code === "ER_DATA_TOO_LONG") {
          return res.status(400).json({
            success: false,
            error: "La firma digital es demasiado grande",
          });
        }
        return res.status(500).json({
          success: false,
          error: "Error al insertar firma digital",
        });
      }
      const insertId = results.insertId || null;
      res.status(201).json({
        success: true,
        message: "Firma digital insertada correctamente",
        data: {
          id: results[0][0].id,
          insertId,
          firma,
          idPersona,
        },
      });
    }
  );
};

const putMethod = (req = request, res = response) => {
  const { id } = req.body;
  const { firma, idPersona } = req.body;
  if (!id || !firma || idPersona == null) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos: ID y Firma",
    });
  }
  pool.query(
    "CALL pa_UpdateFirmaDigital(?, ?, ?)",
    [id, firma, idPersona],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({
          success: false,
          error: "Error al actualizar la firma",
        });
      }

      res.status(200).json({
        success: true,
        message: "Firma actualizada correctamente",
        data: {
          id,
          firma,
          idPersona,
        },
      });
    }
  );
};

const deleteMethod = (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID de firma no proporcionado en el body",
    });
  }
  pool.query("CALL pa_DeleteFirmaDigital(?)", [id], (error, results) => {
    if (error) {
      console.error("Error al eliminar producto:", error);
      return res.status(500).json({
        success: false,
        error: "Error al eliminar la firma",
      });
    }
    res.json({
      success: true,
      message: `Firma con ID ${id} eliminado correctamente`,
    });
  });
};

module.exports = {
  getAllMethod,
  getMethod,
};
