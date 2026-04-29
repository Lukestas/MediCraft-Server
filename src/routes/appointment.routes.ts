import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller.js';
import { AppointmentDataValidator } from '../middleware/appointment.data.validator.js';

export const appointmentRoutes: Router = Router();

appointmentRoutes.post(
  '/',
  AppointmentDataValidator.createAppointmentData,
  AppointmentController.create,
);
appointmentRoutes.get('/', AppointmentController.getAll);
appointmentRoutes.get('/:id', AppointmentController.getById);
appointmentRoutes.put(
  '/:id',
  AppointmentDataValidator.updateAppointmentData,
  AppointmentController.update,
);
appointmentRoutes.delete('/:id', AppointmentController.delete);
