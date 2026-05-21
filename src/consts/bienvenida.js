const bienvenida = (req, res) => {
  res.json({
    success: true,
    message: "Bienvenido a la API del Proyecto Integrador",
    documentation: "Puedes acceder a la documentación en /api/documentacion",
    version: "1.0.0",
    online: true
  });
};

module.exports = bienvenida;
