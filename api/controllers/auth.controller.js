import  User  from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { catchAsync } from '../utils/catchAsync.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = catchAsync(async (req, res, next) => {
    //console.log(req.body);
    const {role, email, password} = req.body;
    if (!role ||!email ||!password || role==="" || email==="" || password==="" ) {
        console.log("hi from error");
        return next(errorHandler(400, 'Please fill all the fields'));
    }
    // hash password
    const hashedPassword =  bcryptjs.hashSync(password, 10);

    const newUser = new User({
        role,
        email,
        password: hashedPassword,
    });
     await newUser.save();
     res.json({mesage: 'User created successfully'});
})


