import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Interfaz para el payload del token JWT
interface JwtPayload {
  id: string;
}

// Middleware para proteger rutas - CORREGIDO con la firma exacta que Express espera
export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    // Verificar si hay token en el encabezado
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Si no hay token, devolver error
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No estás autorizado para acceder a este recurso'
      });
      return;
    }
    
    // Verificar token usando un secreto confiable
    const secret = process.env.JWT_SECRET || 'mi_super_secreto_seguro_2025';
    
    // Callback para manejar la verificación de manera asíncrona
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido o expirado'
        });
      }
      
      // El token es válido, buscar usuario
      try {
        const user = await User.findById((decoded as JwtPayload).id);
        
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'El usuario al que pertenece este token ya no existe'
          });
        }
        
        // Agregar usuario a la solicitud
        req.user = user;
        next();
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error al verificar usuario'
        });
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Error al autenticar'
    });
  }
};