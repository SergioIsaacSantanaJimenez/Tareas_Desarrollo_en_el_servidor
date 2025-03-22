import { Request, Response } from 'express';
import Post from '../models/postModel';

// Controlador para crear una publicación
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, contenido } = req.body;
    
    // Verificar si el usuario está autenticado (debería estarlo por el middleware protect)
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'No estás autorizado para realizar esta acción'
      });
      return;
    }
    
    // Crear publicación con el autor como el usuario logueado
    const post = await Post.create({
      titulo,
      contenido,
      autor: req.user._id
    });
    
    res.status(201).json({
      success: true,
      post
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Controlador para obtener todas las publicaciones
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Obtener publicaciones y poblar el campo autor con los datos del usuario
    const posts = await Post.find()
      .populate({
        path: 'autor',
        select: 'nombre email' // Solo seleccionar nombre y email
      });
    
    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};