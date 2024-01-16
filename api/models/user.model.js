import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    role: {
      type: String,
      enum: ['admin', 'waiter','chef'],
      default: 'waiter',
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowerCase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      trim: true,
      minLength: [6, 'A user password must be at least 8 characters long'],
      select: false,
    },
    avatar:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/09/08/17/00/user-1500849_960_720.png'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema);

export default User;