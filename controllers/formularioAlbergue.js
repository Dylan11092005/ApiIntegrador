const { request, response } = require("express");
const pool = require("../MySQL/basedatos");

const postMethod = (req = request, res = response) => {
  let {
    cocina,
    duchas,
    serviciosSanitarios,
    bodega,
    menajeMobiliario,
    tanqueAgua,
    areaTotalM2,

    capacidadPersonas,
    capacidadColectiva,
    cantidadFamilias,
    ocupacion,
    egresos,
    sospechososSanos,
    otros,

    provincia,
    canton,
    distrito,
    direccion,

    idAlbergue,
    nombre,
    region,
    coordenadaX,
    coordenadaY,
    tipoEstablecimiento,
    tipoAlbergue,
    condicionAlbergue,
    especificacion,
    detalleCondicion,
    administrador,
    telefono,
    seccion,
    requerimientosTecnicos,
    costoRequerimientosTecnicos,
    idMunicipalidad,
    color,
    idPedidoAbarrote,
    idUsuarioCreacion,
  } = req.body;

  otros = otros ?? null;
  direccion = direccion ?? null;
  especificacion = especificacion ?? null;
  detalleCondicion = detalleCondicion ?? null;
  requerimientosTecnicos = requerimientosTecnicos ?? null;
  costoRequerimientosTecnicos = costoRequerimientosTecnicos ?? null;
  idMunicipalidad = idMunicipalidad ?? null;
  color = color ?? null;
  idPedidoAbarrote = idPedidoAbarrote ?? null;
  idUsuarioCreacion = idUsuarioCreacion ?? null;

  if (
    cocina === undefined ||
    duchas === undefined ||
    serviciosSanitarios === undefined ||
    bodega === undefined ||
    menajeMobiliario === undefined ||
    tanqueAgua === undefined ||
    areaTotalM2 === undefined ||
    capacidadPersonas === undefined ||
    capacidadColectiva === undefined ||
    cantidadFamilias === undefined ||
    ocupacion === undefined ||
    egresos === undefined ||
    sospechososSanos === undefined ||
    provincia === undefined ||
    canton === undefined ||
    distrito === undefined ||
    idAlbergue === undefined ||
    nombre === undefined ||
    region === undefined ||
    coordenadaX === undefined ||
    coordenadaY === undefined ||
    tipoEstablecimiento === undefined ||
    tipoAlbergue === undefined ||
    condicionAlbergue === undefined ||
    administrador === undefined ||
    telefono === undefined ||
    seccion === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos requeridos",
      datosValidados: {
        cocina,
        duchas,
        serviciosSanitarios,
        bodega,
        menajeMobiliario,
        tanqueAgua,
        areaTotalM2,
        capacidadPersonas,
        capacidadColectiva,
        cantidadFamilias,
        ocupacion,
        egresos,
        sospechososSanos,
        provincia,
        canton,
        distrito,
        idAlbergue,
        nombre,
        region,
        coordenadaX,
        coordenadaY,
        tipoEstablecimiento,
        tipoAlbergue,
        condicionAlbergue,
        administrador,
        telefono,
        seccion,
      },
    });
  }

  pool.query(
    "CALL pa_InsertAlbergue(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      cocina,
      duchas,
      serviciosSanitarios,
      bodega,
      menajeMobiliario,
      tanqueAgua,
      areaTotalM2,
      capacidadPersonas,
      capacidadColectiva,
      cantidadFamilias,
      ocupacion,
      egresos,
      sospechososSanos,
      otros,
      provincia,
      canton,
      distrito,
      direccion,
      idAlbergue,
      nombre,
      region,
      coordenadaX,
      coordenadaY,
      tipoEstablecimiento,
      tipoAlbergue,
      condicionAlbergue,
      especificacion,
      detalleCondicion,
      administrador,
      telefono,
      seccion,
      requerimientosTecnicos,
      costoRequerimientosTecnicos,
      idMunicipalidad,
      color,
      idPedidoAbarrote,
      idUsuarioCreacion,
    ],
    (error, results) => {
      if (error) {
        console.error("Error en postAlbergue:", error);
        return res
          .status(500)
          .json({ success: false, error: "Error al insertar albergue" });
      }

      res.status(201).json({
        success: true,
        message: "Albergue registrado correctamente",
        data: { id: results[0][0]?.id ?? null },
      });
    }
  );
};

module.exports = {
  postMethod,
};
