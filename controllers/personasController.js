const { request, response } = require("express");
const personasService = require("../service/personasService");

const getAllPersonas = async (req = request, res = response) => {
  try {
    const data = await personasService.getAllPersonas();
    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getAllPersonas:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener las personas; " + error.message,
    });
  }
}

const getAllPersonasByUsuario = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parametro idUsuario en la query.",
    });
  }
  try {
    const { idUsuario } = req.params;
    const data = await personasService.getAllPersonasByUsuario(idUsuario);
    if (data[0]?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada.",
      });
    }
    return res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error en getPersona:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la persona; " + error.message,
    });
  }
}

const getPersona = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parametro id en la query.",
    });
  }
  try {
    const { id } = req.params;
    const data = await personasService.getPersona(id);
    if (data[0]?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada.",
      });
    }
    return res.status(200).json({
      success: true,
      data: data[0][0],
    });
  } catch (error) {
    console.error("Error en getPersona:", error);
    return res.status(500).json({
      success: false,
      error: "Error al obtener la persona; " + error.message,
    });
  }
};


const postPersonas = async (req = request, res = response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "El cuerpo de la solicitud no puede estar vacío.",
    });
  }
  if (!req.firma || typeof req.firma !== 'object') {
    req.firma = { existe: false };
  }
  try {
    ({ personas } = req.body);
    ({ firma } = req);
    const data = await personasService.postPersonas(personas, firma);
    const statusCode =
      data.errores.length === personas.length
        ? 500
        : data.errores.length > 0
          ? 207
          : 201;
    return res.status(statusCode).json({
      success: data.errores.length === 0,
      resultados: data.resultados,
      errores: data.errores,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al registrar personas; " + error.message,
      error: error.message,
    });
  }
};

const deletePersona = async (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el parametro id en la query.",
    });
  }
  try {
    const { id } = req.params;
    const data = await personasService.deletePersona(id);
    return res.status(200).json({
      success: true,
      message: "Persona eliminada correctamente",
      data,
    });
  } catch (error) {
    console.error("Error en deletePersona:", error);
    return res.status(500).json({
      success: false,
      error: "Error al eliminar la persona; " + error.message,
    });
  }
};


const getResumenPersonasPorAlbergue = (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro nombreAlbergue en la query" });
  }
  const { nombreAlbergue } = req.params;
  personasService.getResumenPersonasPorAlbergue(nombreAlbergue)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron personas para el albergue especificado.",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error al obtener albergue por persona:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener albergue por persona; " + error.message,
      });
    });
}

const getResumenPersonasPorSexo = async (req = request, res = response) => {
  const { idAlbergue, sexo } = req.query; // o req.params, según cómo lo definas en la ruta

  if (!idAlbergue || !sexo) {
    return res.status(400).json({
      success: false,
      error: "Se esperaban los parámetros idAlbergue y sexo en la query",
    });
  }

  try {
    const data = await personasService.getResumenPersonasPorSexo(idAlbergue, sexo);

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron personas para el sexo especificado.",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error al obtener resumen por sexo:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener resumen por sexo: " + error.message,
    });
  }
};

const getResumenPersonasPorEdad = async (req = request, res = response) => {
  const { idAlbergue, edadMin, edadMax } = req.query;

  if (!idAlbergue || edadMin == null || edadMax == null) {
    return res.status(400).json({
      success: false,
      error: "Se esperaban los parámetros idAlbergue, edadMin y edadMax en la query",
    });
  }

  try {
    const data = await personasService.getResumenPersonasPorEdad(idAlbergue, Number(edadMin), Number(edadMax));

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron personas en el rango de edad especificado.",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error al obtener resumen por edad:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener resumen por edad: " + error.message,
    });
  }
};

const getResumenDiscapacidad = (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro idEdadPersona en la query" });
  }
  const { idDiscapacidad } = req.params;
  personasService.getResumenDiscapacidad(idDiscapacidad)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron personas con la discapacidad especificada.",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error al obtener discapacidad por persona:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener discapacidad por persona; " + error.message,
      });
    });
}


const getSelectRecursosPorPersona = (req = request, res = response) => {
  if (!req.params) {
    return res.status(400).json({ success: false, error: "Se esperaba el parametro idPersona en la query" });
  }
  const { idPersona } = req.params;
  personasService.getSelectRecursosPorPersona(idPersona)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraro no encontraron recursos con la persona especificada.",
        });
      }
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error al obtener recurso por persona:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener recurso por persona; " + error.message,
      });
    });
}

module.exports = {
  getAllPersonas,
  getPersona,
  getResumenDiscapacidad,
  postPersonas,
  deletePersona,
  getResumenPersonasPorAlbergue,
  getAllPersonasByUsuario,
  getResumenPersonasPorSexo,
  getResumenPersonasPorEdad,
  getSelectRecursosPorPersona
};
