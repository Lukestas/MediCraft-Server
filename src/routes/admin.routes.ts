import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller.js';

export const adminRoutes: Router = Router();

adminRoutes.get('/:id', AdminController.getById);
adminRoutes.post('/', AdminController.create);
adminRoutes.delete('/:id', AdminController.delete);
adminRoutes.put('/:id', AdminController.update);
