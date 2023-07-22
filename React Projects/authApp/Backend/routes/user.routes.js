import express from 'express';
import { signup, signin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', signin);
router.post('/register', signup);

export default router;
