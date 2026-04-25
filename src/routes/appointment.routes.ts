import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller.js';

export const appointmentRoutes: Router = Router();

appointmentRoutes.get('/', AppointmentController.getAll);
appointmentRoutes.get('/:id', AppointmentController.getById);
appointmentRoutes.post('/', AppointmentController.create);
appointmentRoutes.delete('/:id', AppointmentController.delete);
appointmentRoutes.put('/:id', AppointmentController.update);
