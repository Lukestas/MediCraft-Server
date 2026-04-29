import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserDataValidator } from '../middleware/user.data.validator.js';

export const userRoutes: Router = Router();

userRoutes.get('/', UserController.getAll);
userRoutes.get('/:id', UserController.getById);
userRoutes.post('/', UserDataValidator.createUserData, UserController.create);
userRoutes.put('/:id', UserDataValidator.updateUserData, UserController.update);
userRoutes.delete('/:id', UserController.delete);
