import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validar que se recibieron email y password
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Email y contraseña son requeridos' 
    });
  }

  // Generar el token JWT
  const token = jwt.sign(
    { email, password }, // Payload - los datos que vamos a incluir en el token
    process.env.JWT_SECRET || 'default_secret'
    // Quité el tiempo de expiración como mencionaste
  );

  // Responder con el token
  return res.status(200).json({
    success: true,
    token
  });
};