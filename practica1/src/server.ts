import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/database';

// Cargar variables de entorno
dotenv.config();

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor después de conectar a la base de datos
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

// Iniciar el servidor
startServer();