import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
});

const app = express();

app.use(express.json());

app.listen(8080, () => {
    console.log('Server running on port 8080');
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandlerMiddleware);