import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extiende el tipo Request para incluir la propiedad user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token del header 'Authorization'
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Acceso denegado. Token no proporcionado.' 
    });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Token inválido o expirado.' 
    });
  }
};