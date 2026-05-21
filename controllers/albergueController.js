const { request, response } = require("express");
const albergueService = require("../service/albergueService");

const getAllAlbergues = async (req, res) => {
  try {
    const data = await albergueService.getAllAlbergues();
    res.status(200).json({
      success: true,
      data: data[0],
      message: "Albergues obtenidos exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los albergues",
      error: error.message,
    });
  }
};

const getAlbergue = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getAlbergue(id);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0][0],
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

const deleteAlbergue = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    await albergueService.deleteAlbergue(id);
    res.json({
      success: true,
      message: `Albergue con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el albergue",
      error: error.message,
    });
  }
};

const getForIdAlbergue = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForIdAlbergue(id);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

const getForNombreAlbergue = async (req = request, res = response) => {
  const { nombre } = req.params;
  if (!nombre) {
    return res.status(400).json({
      success: false,
      message: "Nombre del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForNombreAlbergue(nombre);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

const getForDistritoAlbergue = async (req = request, res = response) => {
  const { distrito } = req.params;
  if (!distrito) {
    return res.status(400).json({
      success: false,
      message: "Distrito del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForDistritoAlbergue(distrito);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

const getForCantonAlbergue = async (req = request, res = response) => {
  const { canton } = req.params;
  if (!canton) {
    return res.status(400).json({
      success: false,
      message: "Cantón del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getForCantonAlbergue(canton);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data,
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

const getForProvinciaAlbergue = async (req = request, res = response) => {
  const { provincia } = req.params;
  if (!provincia) {
    return res.status(400).json({
      success: false,
      message: "Provincia del albergue es requerida",
    });
  }
  try {
    const data = await albergueService.getForProvinciaAlbergue(provincia);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};


const getResumenAlberguesColor = async (req = request, res = response) => {
  const { color } = req.params;
  if (!color) {
    return res.status(400).json({
      success: false,
      message: "Color del albergue es requerido",
    });
  }
  try {
    const data = await albergueService.getResumenAlberguesColor(color);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Color de albergue no encontrado",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Color de albergue obtenido exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el albergue",
      error: error.message,
    });
  }
};

const getAllAlberguesPorUsuario = async (req = request, res = response) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({
      success: false,
      message: "ID de usuario es requerido",
    });
  }
  try {
    const data = await albergueService.getAllAlberguesPorUsuario(idUsuario);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Albergues no encontrados para el usuario",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Albergues obtenidos exitosamente para el usuario",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los albergues del usuario",
      error: error.message,
    });
  }
};

const putAlbergueFamilia = async (req = request, res = response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Se esperaba el parametro id en la query",
      });
  }
  try {
    const { idFamilia, idAlbergue, idUsuarioModificacion } = req.body;
    const data = await albergueService.putAlbergueFamilia({ idFamilia, idAlbergue, idUsuarioModificacion });
    res.status(200).json({ success: true, message: "Todo salio bien" });
  } catch (error) {
    console.log("Error en putAlbergueFamilia; " + error.message, error);
    res.status(500).json({ success: false, message: "Error al actualizar albergue familia: " + error.message });
  }
};

const putAlbergue = async (req = request, res = response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Se esperaba el cuerpo de la petición",
      });
  }
  try {
    const { id } = req.params;
    const {
      condicionAlbergue,
      especificacion,
      capacidadPersonas,
      capacidadColectiva,
      ocupacion,
      detalleCondicion,
      cocina,
      duchas,
      serviciosSanitarios,
      bodega,
      menajeMobiliario,
      tanqueAgua,
      administrador,
      telefono,
      color,
      idUsuarioModificacion,
    } = req.body;
    const data = await albergueService.putAlbergue({
      id,
      condicionAlbergue,
      especificacion,
      capacidadPersonas,
      capacidadColectiva,
      ocupacion,
      detalleCondicion,
      cocina,
      duchas,
      serviciosSanitarios,
      bodega,
      menajeMobiliario,
      tanqueAgua,
      administrador,
      telefono,
      color,
      idUsuarioModificacion,
    });
    res.status(200).json({
      success: true,
      message: "Albergue actualizado correctamente"
    });
  } catch (error) {
    console.log("Error en putAlbergue: " + error.message, error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar albergue: " + error.message
    });
  }
};


const postAlbergue = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Se esperaba el body en la consulta post",
    });
  }
  const {
    idAlbergue,
    nombre,
    region,
    provincia,
    canton,
    distrito,
    direccion,
    tipoEstablecimiento,
    administrador,
    telefono,
    capacidadPersonas,
    ocupacion,
    cocina,
    duchas,
    serviciosSanitarios,
    bodega,
    menajeMobiliario,
    tanqueAgua,
    areaTotalM2,
    idMunicipalidad,
    capacidadColectiva,
    cantidadFamilias,
    egresos,
    sospechososSanos,
    otros,
    coordenadaX,
    coordenadaY,
    tipoAlbergue,
    condicionAlbergue,
    especificacion,
    detalleCondicion,
    seccion,
    requerimientosTecnicos,
    costoRequerimientosTecnicos,
    color,
    idPedidoAbarrote,
    idUsuarioCreacion,
  } = req.body;
  try {
    const result = await albergueService.postAlbergue({
      idAlbergue,
      nombre,
      region,
      provincia,
      canton,
      distrito,
      direccion,
      tipoEstablecimiento,
      administrador,
      telefono,
      capacidadPersonas,
      ocupacion,
      cocina,
      duchas,
      serviciosSanitarios,
      bodega,
      menajeMobiliario,
      tanqueAgua,
      areaTotalM2,
      idMunicipalidad,
      capacidadColectiva,
      cantidadFamilias,
      egresos,
      sospechososSanos,
      otros,
      coordenadaX,
      coordenadaY,
      tipoAlbergue,
      condicionAlbergue,
      especificacion,
      detalleCondicion,
      seccion,
      requerimientosTecnicos,
      costoRequerimientosTecnicos,
      color,
      idPedidoAbarrote,
      idUsuarioCreacion,
    });
    res.status(201).json({
      success: true,
      message: "Albergue insertado correctamente",
      data: result
    });
  } catch (error) {
    console.error("Error al insertar albergue:", error);
    res.status(500).json({
      success: false,
      error: "Error al insertar albergue",
      details: error.message
    });
  }
};

module.exports = {
  getAllAlbergues,
  getAlbergue,
  deleteAlbergue,
  getForIdAlbergue,
  getForNombreAlbergue,
  getForDistritoAlbergue,
  getForCantonAlbergue,
  getForProvinciaAlbergue,
  getResumenAlberguesColor,
  postAlbergue,
  getAllAlberguesPorUsuario,
  putAlbergueFamilia,
  putAlbergue
};