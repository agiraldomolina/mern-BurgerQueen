import  User  from '../models/user.model.js';
import bcrypt from 'bcrypt'
import { catchAsync } from '../utils/catchAsync.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = catchAsync(async (req, res, next) => {
    //console.log(req.body);
    const {role, email, password} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        return next(errorHandler(400, 'User already exists'));
    };

    if (!role ||!email ||!password || role==="" || email==="" || password==="" ) {
        return next(errorHandler(400, 'Please fill all the fields'));
    }

    const newUser = new User({
        role,
        email,
        password,
    });
     await newUser.save();
     res.json({mesage: 'User created successfully'});
});

const createSendToken =(user, statusCode, res) => {
    const token = jwt.sign({
        _id: user._id,
        isAdmin: user.isAdmin,
        isWaiter: user.role === 'waiter',
        isChef: user.role === 'chef',      
    }, process.env.JWT_SECRET)

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
}


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
    if (!user || !await user.correctPassword(password)) return next(errorHandler(400, 'Invalid email or password'));   
    //create a token
    createSendToken(user, 201, res);
})
export const googleSignin = catchAsync(async (req, res, next) => {
    const {email, googlePhotoUrl} = req.body;
    console.log ('googlePhotoUrl from signin: ' + googlePhotoUrl);
    const user = await User.findOne({email});
    console.log('user from db:'+ JSON.stringify(user) );
    if (user){
        createSendToken(user, 201, res);
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
        createSendToken(newUser, 201, res);
    }
});

export const signout = catchAsync(async (req, res, next) => {
    res.cookie('access_token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res
    .status(200)
    .json({message: 'Logged out successfully'})
    // res.clearCookie('access_token');
    // res.status(200).json( 'User signed out successfully');
});

