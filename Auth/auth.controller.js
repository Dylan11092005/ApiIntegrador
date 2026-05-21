const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarioModel");
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no esta definida en las variables de entorno.");
}

class AuthController {

  async login(req, res) {
    try {
      const { correo, usuario, contrasena } = req.body;

      if (!contrasena) {
        return res.status(400).json({
          success: false,
          error: "Contraseña es requeridos",
        });
      }
      if (!usuario && !correo) {
        return res.status(400).json({
          success: false,
          error: "Correo o nombre de usuario es requeridos",
        });
      }

      const identificador = usuario || correo;
      const resultadoUsuario = await usuarioModel.loginUsuarioDirecto(identificador, contrasena);

      if (!resultadoUsuario || resultadoUsuario.length === 0) {
        return res.status(401).json({
          success: false,
          error: "Credenciales inválidas",
        });
      }

      const usuarioEncontrado = resultadoUsuario[0];

      const tokenpayload = {
        id: usuarioEncontrado.idUsuario,
        correo: usuarioEncontrado.correo,
        rol: usuarioEncontrado.rol,
        idMunicipalidad: usuarioEncontrado.idMunicipalidad
      };

      const token = jwt.sign(tokenpayload, JWT_SECRET, {
        expiresIn: '24h',
        issuer: 'auth-service',
        audience: 'api-users'
      });

      try {
        
      } catch (error) {
        console.log('No se pudo actualizar última sesión:', error.message);
      }

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      };

      res.cookie('authToken', token, cookieOptions);
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        token: token,
        usuario: {
            id: usuarioEncontrado.idUsuario,
            nombreUsuario: usuarioEncontrado.nombreUsuario,
            correo: usuarioEncontrado.correo,
            rol: usuarioEncontrado.rol,
            idMunicipalidad: usuarioEncontrado.idMunicipalidad
        }
      });

    } catch (error) {
      console.error("Error en consulta de usuario:", error);
      return res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  }

  async logout(req, res){
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            domain: 'api.integrador.dev'
        });

        res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente'
      });

    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        })
    }
  }

  async validateToken(req, res){
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');

    res.json({
        success: true,
        message: 'Token válido',
        usuario: req.usuario
    });
  }

}

module.exports = new AuthController();
