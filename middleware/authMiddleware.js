const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definida en las variables de entorno');
}

const publicRoutes = [
  { method: 'PUT', path: '/api/usuarios/contrasena' },
  { method: 'POST', path: '/api/usuarios/validar/correo' },
  { method: 'POST', path: '/api/usuarios/login' },
  { method: 'POST', path: '/api/personas/' }
];

const authMiddleware = (req, res, next) => {
  const isPublicRoute = publicRoutes.some(route =>
    req.method === route.method &&
    (req.path === route.path || req.originalUrl === route.path)
  );

  if (isPublicRoute) {
    console.log(`Ruta pública detectada: ${req.method} ${req.path}`);
    return next();
  }

  try {
    let token;
    if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken;
    } else {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'Formato de token inválido. Use: Bearer <token>'
        });
      }
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token de acceso requerido'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = {
      id: decoded.id,
      correo: decoded.correo,
      rol: decoded.rol,
      idMunicipalidad: decoded.idMunicipalidad
    };

    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error.message);
    let mensaje = 'Error de autenticación';
    if (error instanceof jwt.JsonWebTokenError) {
      mensaje = 'Token inválido';
    } else if (error instanceof jwt.TokenExpiredError) {
      mensaje = 'Token expirado';
    }
    return res.status(401).json({
      success: false,
      error: mensaje
    });
  }
};

module.exports = authMiddleware;