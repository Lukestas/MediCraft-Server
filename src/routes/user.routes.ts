import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

export const userRoutes: Router = Router();

userRoutes.get('/', UserController.getAll);
userRoutes.post('/', UserController.create);
