import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller.js';

export const doctorRoutes: Router = Router();

doctorRoutes.get('/:id', DoctorController.getById);
doctorRoutes.get('/', DoctorController.getAll);
doctorRoutes.post('/', DoctorController.create);
doctorRoutes.delete('/:id', DoctorController.delete);
doctorRoutes.put('/:id', DoctorController.update);
