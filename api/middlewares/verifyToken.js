import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error';

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(errorHandler(401, 'No token provided'));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(errorHandler(401, 'No token provided'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(errorHandler(401, 'Invalid token'));
    }
}