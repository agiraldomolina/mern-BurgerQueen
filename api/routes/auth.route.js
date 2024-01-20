import express from 'express';
import { googleSignin, signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/googlesignin', googleSignin);


export default router;