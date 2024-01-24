import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
    },
    avatar:{
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema);

export default User;