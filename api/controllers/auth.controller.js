import  User  from '../models/user.model.js';
import bcrypt from 'bcrypt'
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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword =  bcrypt.hashSync(password, salt);

    const newUser = new User({
        role,
        email,
        password: hashedPassword,
    });
     await newUser.save();
     res.json({mesage: 'User created successfully'});
});

export const signin = catchAsync(async (req, res, next) => {
    //get data from body
    const {email, password} = req.body;
    // console.log('email and password from body: ' + JSON.stringify(req.body) );

    // check if email and password exist
    if (!email ||!password || email==="" || password===""){
        console.log("hi from error");
        return next(errorHandler(400, 'Please fill all the fields'));
    } 
    // look for user by email
    const user = await User.findOne({email});
    //console.log('user from db:'+ JSON.stringify(user) );

    // check if user exist and if password is correct
    if (!user || !await user.correctPassword(password,user.password)) return next(errorHandler(400, 'Invalid email or password'));
    
    //create a token
    const token = jwt.sign(
        {
            _id: user._id, 
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET);

    console.log('token from signin: ' + token);

    //destructuring the user object
    const{password: pass, ...userWithoutPassword} = user._doc;

    //send the token to the client
    res
    .status(200)
    .cookie(
        'access_token', token,
        {httpOnly: true}
    )
    .json(userWithoutPassword);
})
export const googleSignin = catchAsync(async (req, res, next) => {
    const {email, googlePhotoUrl} = req.body;
    const user = await User.findOne({email});
    if (user){
        const token = jwt.sign(
            {
                _id: user._id, 
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET
        );
        const {password: pass,...userWithoutPassword} = user._doc;
        res
        .status(200)
        .cookie(
            'access_token', token,
            {httpOnly: true}
        )
        .json(userWithoutPassword);
    }else{
        const generatedpassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedpassword, 10);
        const newUser = new User({
            role: 'waiter',
            email,
            password: hashedPassword,
            avatar: googlePhotoUrl
        })
        await newUser.save();
        const token = jwt.sign(
            {
                _id: newUser._id, 
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET
        );
        const {password: pass,...userWithoutPassword} = newUser._doc;
        res
        .status(200)
        .cookie(
            'access_token', token,
            {httpOnly: true}
        ).json(userWithoutPassword);
    }
});

export const signout = catchAsync(async (req, res, next) => {
    res.clearCookie('access_token');
    res.status(200).json( 'User signed out successfully');
});

