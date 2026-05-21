const { request, response } = require("express");
const mascotaService = require("../service/mascotaService");



const getAllMascotas = async (req = request, res = response) => {
    try {
        const result = await mascotaService.getAllMascotas();
        res.json({
            success: true,
            data: result[0],
        });
    } catch (error) {
        console.error("Error en getAllMascotas:", error);
        res.status(500).json({
            success: false,
            error: "Error al obtener las mascotas",
        });
    }
};

const getMascota = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await mascotaService.getMascota(id);
        res.json({
            success: true,
            data: result[0][0],
        });
    } catch (error) {
        console.error("Error en getMascota:", error);
        if (error.message === 'Mascota no encontrada') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al obtener la mascota",
        });
    }

};

const postMascota = async (req = request, res = response) => {
    let { idFamilia, tipo, tamaño, nombreMascota } = req.body;
    try {
        const data = await mascotaService.postMascota({ idFamilia, tipo, tamaño, nombreMascota });
        res.status(201).json({
            success: true,
            message: 'Producto insertado correctamente',
            data: {
                id: data[0][0].id,
                idFamilia,
                tipo,
                tamaño,
                nombreMascota,

            }
        });
    } catch (error) {
        console.error("Error en postMascota:", error);
        if (error.message.includes('Faltan datos obligatorios')) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al insertar producto",
            error: error.message, // esto es opcional, pero puede ayudar a depurar (se debe eliminar en producción)
        });
    }
}

const deleteMascota = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await mascotaService.deleteMascota(id);
        res.json({
            success: true,
            message: `Mascota con ID ${id} eliminada correctamente`,
        });
    } catch (error) {
        console.error("Error en deleteMascota:", error);
        if (error.message === 'Mascota no encontrada o ya fue eliminada') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: "Error al eliminar la mascota",
        });
    }
}

const getForMascotaFamilia = async (req = request, res = response) => {
  const { codigoFamilia } = req.params;
  if (!codigoFamilia) {
    return res.status(400).json({
      success: false,
      message: "Nombre del mascota familia es requerido",
    });
  }
  try {
    const data = await mascotaService.getForMascotaFamilia(codigoFamilia);
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Mascota no encontrada para la familia especificada",
      });
    }
    res.json({
      success: true,
      data: data[0],
      message: "Mascota obtenida correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener mascota por familia",
      error: error.message,
    });
  }
};

module.exports = {
    getAllMascotas,
    getMascota,
    postMascota,
    deleteMascota,
    getForMascotaFamilia,
};