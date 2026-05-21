const { request, response } = require("express");
const familiaService = require("../service/familiaService");

const getAllFamilias = async (req = request, res = response) => {
  try {
    const data = await familiaService.getAllFamilias();
    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllMethod:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener familias; " + error.message,
    });
  }
}

const getFamilia = async (req = request, res = response) => {
  if (!req.params) return res.status(400).json({ success: false, error: "Se esperaba el parametro id en la query" });
  try {
    const { id } = req.params;
    const data = await familiaService.getFamilia(id);
    if (data[0]?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Familia no encontrada",
      });
    }
    res.status(200).json({
      success: true,
      data: data[0][0],
    });
  } catch (error) {
    console.error("Error en getMethod:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la familia; " + error.message
    });
  }
}

const postFamilia = async (req = request, res = response) => {
  if (!req.body) return res.status(400).json({ success: false, error: "Se esperaba el body de la consulta" });
  try {
    const { provincia, canton, distrito, direccion, codigoFamilia, cantidadPersonas, idAlbergue, idAmenaza, idPersona, idUsuarioCreacion } = req.body;
    const data = await familiaService.postFamilia({ provincia, canton, distrito, direccion, codigoFamilia, cantidadPersonas, idAlbergue, idAmenaza, idPersona, idUsuarioCreacion });
    res.status(201).json({
      success: true,
      message: "se insertó correctamente",
      idFamilia: data.idFamilia
    });
  } catch (error) {
    if (error.flagStatus || error.flagStatus === 400) {
      return res.status(error.flagStatus).json({
        success: false, error: error.message
      })
    }
    console.error("Error al insertar familia:", error);
    return res.status(500).json({
      success: false,
      error: "Error al insertar familia; " + error.message,
    });
  }
}

const putFamilia = async (req = request, res = response) => {
  res.status(404).json({
    success: false,
    message: "Este método no está implementado aun, consulte a grupo api.",
  });
}

const putEgresoFamilia = async (req = request, res = response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Se esperaba el parametro id en la query",
      });
  }
  try {
    const { id, idModificacion } = req.body;
    const data = await familiaService.putEgresoFamilia({ id, idModificacion });
    res.status(200).json({ success: true, message: "Todo salio bien" });
  } catch (error) {
    console.log("Error en putEgresoFamilia; " + error.message, error);
    res.status(500).json({ success: false, message: "Error al actualizar egreso: " + error.message});
  }
};

const getVistaFamiliaJefe = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro id en la query" });
  }
  try {
    const { id } = req.params;
    const data = await familiaService.getVistaFamiliaJefe(id);
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Familia no encontrada",
      });
    }
    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getVistaFamiliaJefe:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener vista Familia Jefe; " + error.message,
    });
  }
}

const getForCedulaJefe = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro cedula en la query" });
  }
  try {
    const { cedula } = req.params;
    const data = await familiaService.getForCedulaJefe(cedula);
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Familia no encontrada",
      });
    }
    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getForCedulaJefe:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener familia por cedula del jefe; " + error.message,
    });
  }
}

const generarIdentificador = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el canton en la query" });
  }
  const { canton } = req.params;
  try {
    const identificador = await familiaService.generarIdentificador(canton);
    res.status(200).json({
      success: true,
      identificador: identificador,
    });
  } catch (error) {
    console.error("Error al generar identificador:", error);
    return res.status(500).json({
      success: false,
      error: "Error al generar identificador; " + error.message,
    });
  }
}

const getObtenerReferenciasPorCodigoFamilia = (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro codigoFamilia en la query" });
  }
  const { codigoFamilia } = req.params;
  familiaService.getObtenerReferenciasPorCodigoFamilia(codigoFamilia)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron referencias para el código de familia proporcionado",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error al obtener referencias por código de familia:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener referencias por código de familia; " + error.message,
      });
    });
}

const getAllFamiliasPorUsuario = (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro idUsuario en la query" });
  }
  const { idUsuario } = req.params;
  familiaService.getAllFamiliasPorUsuario(idUsuario)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron familias para el usuario proporcionado",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error al obtener familias por usuario:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener familias por usuario; " + error.message,
      });
    });
}

module.exports = {
  getAllFamilias,
  getFamilia,
  postFamilia,
  putFamilia,
  putEgresoFamilia,
  getVistaFamiliaJefe,
  getForCedulaJefe,
  generarIdentificador,
  getObtenerReferenciasPorCodigoFamilia,
  getAllFamiliasPorUsuario
};
