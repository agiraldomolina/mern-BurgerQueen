import User from '../models/user.model.js';
import { catchAsync } from "../utils/catchAsync.js"
import bcrypt from 'bcrypt';
import { errorHandler } from "../utils/error.js";
export const test = (req, res) => {
    res.json('API is working');
}

export const updateUser = catchAsync(async (req, res, next) => {
    console.log('req.body:' + JSON.stringify (req.body));
    console.log('req.params:' + JSON.stringify (req.params.userId));
    console.log('req.user._id: '+ req.user._id);
    if(req.user._id!== req.params.userId && !req.user.isAdmin){
        return next(errorHandler(401, 'You are not allow to update this user'));
    }

    if (req.body.password){
        if(req.body.password.length < 6) return next( errorHandler(400, 'Password must be at least 6 characters'));
        req.body.password =  bcrypt.hashSync(req.body.password, 10);
    }

    if (req.body.role && !req.user.isAdmin) return next( errorHandler(401, 'You are not allow to update role'));

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
        $set: {
            email: req.body.email,
            role: req.body.role,
            avatar: req.body.profilePicture,
            password: req.body.password
        },
    }, {new: true});
    const {password,...userWithoutPassword} = updatedUser._doc;
    //console.log('updatedUser:'+ JSON.stringify(updatedUser));
    res
    .status(200)
    .json(userWithoutPassword)
});

export const deleteUser = catchAsync(async (req, res, next) => {
    //console.log ('hi from deleteUser');
    if (req.user.isAdmin || req.user._id === req.params.userId ) {
        await User.findByIdAndDelete(req.params.userId);
        res.clearCookie('access_token');
        res
        .status(200)
        .json('User deleted successfully')
    }else{
        return next( errorHandler(403, 'You are not allow to delete this user'));
    }
});

export const getUsers = catchAsync(async (req, res, next) => {
    // console.log('hi from getUsers');
    // console.log('sort order: '+ req.query.order);
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'role';
    const sortDirection = req.query.order === 'asc'? -1 : 1;
    
    const projection ={
        email: 1,
        role: 1,
        avatar: 1,
        updatedAt: 1
    };

    const users = await User.find({
        ...(req.query.role && {role: req.query.role}),
        ...(req.query.email && {email: req.query.email}),
        ...(req.query.userId && {_id: req.query.userId}),      
    }, projection)
    .sort([[sortBy, sortDirection]])
    .skip(startIndex)
    .limit(limit);

    const totalUsers = await User.countDocuments();

    res
    .status(200)
    .json({
        users,
        totalUsers
    })
})