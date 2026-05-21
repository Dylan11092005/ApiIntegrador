const { request, response } = require("express");

const rutaInvalida = (req = request, res = response) => {
    return res.status(404).json({
        success: false,
        message: "Esta funcion no existente, pero se puede llamar por razones administrativa."
        })
}

module.exports = {rutaInvalida};