import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';

// Interfaz para el modelo de publicación
export interface IPost extends Document {
  titulo: string;
  contenido: string;
  fecha: Date;
  autor: IUser['_id'] | IUser;
}

// Esquema de la publicación
const postSchema = new Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El autor es obligatorio']
  }
}, {
  timestamps: true
});

// Crear y exportar el modelo
const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;