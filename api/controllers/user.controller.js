import User from '../models/user.model.js';
import { catchAsync } from "../utils/catchAsync.js"
import bcrypt from 'bcrypt';
import { errorHandler } from "../utils/error.js";
export const test = (req, res) => {
    res.json('API is working');
}

export const updateUser = catchAsync(async (req, res, next) => {
    //console.log('req.body:' + JSON.stringify (req.body));
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
})