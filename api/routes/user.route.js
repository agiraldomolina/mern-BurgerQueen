import express from 'express';
import {  test } from '../controllers/user.controller.js';
import { 
    updateUser,
    deleteUser,
    getUsers
 } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.get('/get', verifyToken, getUsers);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);


export default router;