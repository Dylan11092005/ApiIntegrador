const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definida en las variables de entorno');
}

const verificarToken = (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.authToken){
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
        
        if(!token){
            return res.status(401).json({
                success: false,
                error: 'Token de acceso requerido'
            })
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
        console.error('Error en verificarToken:', error.message);
        
        let mensaje = 'Error de autenticación';
        
        if (error instanceof jwt.JsonWebTokenError) {
            mensaje = 'Token inválido';
        } else if (error instanceof jwt.TokenExpiredError) {
            mensaje = 'Token expirado';
        }

        return res.status(402).json({ 
            success: false,
            error: mensaje 
        });
    }
};

module.exports = verificarToken;