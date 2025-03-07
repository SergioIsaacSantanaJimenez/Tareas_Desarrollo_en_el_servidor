import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);
app.use('/api', profileRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});