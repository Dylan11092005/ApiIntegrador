const DbService = require('../MySQL/dbConfig')
const db = DbService.getDbServiceInstance();
class albergueModel {
  async getAllAlbergues() {
    try {
      return await db.query("CALL pa_SelectAllAlbergue();");
    } catch (error) {
      console.error("Error en getAllAlbergues: ", error);
      throw error;
    }
  }

  async getAlbergue(id) {
    try {
      return await db.query("CALL pa_SelectAlbergue(?);", [id]);
    } catch (error) {
      console.error("Error en getAmenaza: ", error);
      throw error;
    }
  }

  async deleteAlbergue(id) {
    try {
      return await db.query("CALL pa_DeleteAlbergue(?);", [id]);
    } catch (error) {
      console.error("Error en deleteAlbergue: ", error);
      throw error;
    }
  }
  async postAlbergue(Albergue) {
    try {
      const query = `
            CALL pa_InsertAlbergue(
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            );
        `;

      const values = [
        // Infraestructura
        Albergue.cocina,
        Albergue.duchas,
        Albergue.serviciosSanitarios,
        Albergue.bodega,
        Albergue.menajeMobiliario,
        Albergue.tanqueAgua,
        Albergue.areaTotalM2,

        // Capacidad
        Albergue.capacidadPersonas,
        Albergue.capacidadColectiva,
        Albergue.cantidadFamilias,
        Albergue.ocupacion,
        Albergue.egresos,
        Albergue.sospechososSanos,
        Albergue.otros,

        // Ubicación
        Albergue.provincia,
        Albergue.canton,
        Albergue.distrito,
        Albergue.direccion,

        // Albergue
        Albergue.idAlbergue,
        Albergue.nombre,
        Albergue.region,
        Albergue.coordenadaX,
        Albergue.coordenadaY,
        Albergue.tipoEstablecimiento,
        Albergue.tipoAlbergue,
        Albergue.condicionAlbergue,
        Albergue.especificacion,
        Albergue.detalleCondicion,
        Albergue.administrador,
        Albergue.telefono,
        Albergue.seccion,
        Albergue.requerimientosTecnicos,
        Albergue.costoRequerimientosTecnicos,
        Albergue.idMunicipalidad,
        Albergue.color,
        Albergue.idPedidoAbarrote,
        Albergue.idUsuarioCreacion,
      ];
      return await db.query(query, values);
    } catch (error) {
      console.error("Error en postAlbergue: ", error);

      throw error;
    }
  }

  async getForIdAlbergue(id) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorId(?);", [id]);
    } catch (error) {
      console.error("Error al encontrar el albergue: ", error);
      throw error;
    }
  }

  async getForNombreAlbergue(nombre) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorNombre(?);", [nombre]);
    } catch (error) {
      console.error("Error al encontrar el albergue: ", error);
      throw error;
    }
  }

  async getForDistritoAlbergue(distrito) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorDistrito(?);", [
        distrito,
      ]);
    } catch (error) {
      console.error("Error al encontrar el albergue por distrito: ", error);
      throw error;
    }
  }

  async getForCantonAlbergue(canton) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorCanton(?);", [canton]);
    } catch (error) {
      console.error("Error al encontrar el albergue por canton: ", error);
      throw error;
    }
  }

  async getForProvinciaAlbergue(provincia) {
    try {
      return await db.query("CALL pa_ConsultarAlberguePorProvincia(?);", [
        provincia,
      ]);
    } catch (error) {
      console.error("Error al encontrar el albergue por provincia: ", error);
      throw error;
    }
  }

  async getResumenAlberguesColor(color) {
    try {
      return await db.query("CALL pa_ResumenAlberguesColor(?);", [color]);
    } catch (error) {
      console.error("Error al encontrar el albergue por color: ", error);
      throw error;
    }
  }

  async getAllAlberguesPorUsuario(idUsuario) {
    try {
      return await db.query("CALL pa_SelectAllAlberguesPorUsuario(?);", [
        idUsuario,
      ]);
    } catch (error) {
      console.error("Error al encontrar el albergue por usuario: ", error);
      throw error;
    }
  }

  async putAlbergueFamilia(albergueFa) {
    try {
      return await db.query('CALL pa_UpdateAlbergueFamilia(?,?,?);', [albergueFa.idFamilia, albergueFa.idAlbergue, albergueFa.idUsuarioModificacion]);
    } catch (error) {
      console.error("Error en putAlbergueFamilia: ", error);
      throw error;
    }
  }

  async putAlbergue(albergue) {
    try {
        return await db.query(
          "CALL pa_UpdateAlbergue(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
          [
            albergue.id,
            albergue.condicionAlbergue,
            albergue.especificacion,
            albergue.capacidadPersonas,
            albergue.capacidadColectiva,
            albergue.ocupacion,
            albergue.detalleCondicion,
            albergue.cocina,
            albergue.duchas,
            albergue.serviciosSanitarios,
            albergue.bodega,
            albergue.menajeMobiliario,
            albergue.tanqueAgua,
            albergue.administrador,
            albergue.telefono,
            albergue.color,
            albergue.idUsuarioModificacion,
          ]
        );
    } catch (error) {
        console.error("Error en putAlbergue: ", error);
        throw error;
    }
}
}

module.exports = new albergueModel();



