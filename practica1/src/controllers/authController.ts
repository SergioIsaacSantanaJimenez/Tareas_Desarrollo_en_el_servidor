import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

// Función para generar token JWT
const generateToken = (id: string): string => {
  // Asegurarnos que el secreto es una string
  const secret = process.env.JWT_SECRET || 'secret';
  
  // Corregido: Asegurarnos que todos los argumentos son del tipo correcto
  return jwt.sign(
    { id },
    secret,
    { expiresIn: '1h' } as jwt.SignOptions
  );  
};

// Controlador para registrar usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
      return;
    }
    
    // Crear nuevo usuario
    const user = await User.create({
      nombre,
      email,
      password
    });
    
    // Generar token
    // Corregido: Convertir el ObjectId a string
    const token = generateToken(user._id.toString());
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Controlador para iniciar sesión
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // Verificar si se proporcionaron email y contraseña
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Por favor proporcione email y contraseña'
      });
      return;
    }
    
    // Buscar usuario y seleccionar contraseña
    const user = await User.findOne({ email }).select('+password');
    
    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
      return;
    }
    
    // Generar token
    // Corregido: Convertir el ObjectId a string
    const token = generateToken(user._id.toString());
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Controlador para obtener perfil del usuario
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // El usuario ya debe estar en req.user gracias al middleware protect
    const user = req.user;
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};