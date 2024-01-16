import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
});

const app = express();

app.listen(8080, () => {
    console.log('Server running on port 8080');
})