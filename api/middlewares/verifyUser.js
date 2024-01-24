import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyToken =  async(req,res,next) => {
     console.log ('hi from verify token')
     console.log('acces_token from verifyToken: ' + req.cookies.access_token);
     const token = req.cookies.access_token;  // install cookie-parser and initialize ii index.js
    //console.log('token from verifyToken again:'+ token);
    if (!token) return next( errorHandler(401, 'Unauthorized'));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
         //console.log('error from verify token: ' + err);
        if (err) return next( errorHandler(401, 'Unauthorized'));
        req.user = user;
        //console.log('user from verify user: ' + JSON.stringify(req.user) )
        next();
    })
}