// En roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express'; // Importa este tipo

// Middleware para restringir acceso por rol
export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Verificar si el usuario existe en la solicitud
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'No estás autorizado para acceder a este recurso'
      });
      return; // Usa return separado en lugar de return res.status()
    }
    
    // Verificar si el rol del usuario está permitido
    if (!roles.includes(req.user.rol)) {
      res.status(403).json({
        success: false,
        message: 'No tienes permiso para realizar esta acción'
      });
      return; // Usa return separado en lugar de return res.status()
    }
    
    next();
  };
};