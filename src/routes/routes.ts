import { Router } from 'express';
import { userRoutes } from './user.routes.js';
import { patientRoutes } from './patient.routes.js';
import { doctorRoutes } from './doctor.routes.js';
import { appointmentRoutes } from './appointment.routes.js';

export const routes: Router = Router();

routes.get('/health', (_req, res) => {
  return res.status(200).json({ message: 'Server Health' });
});

routes.use('/users', userRoutes);
routes.use('/patients', patientRoutes);
routes.use('/doctors', doctorRoutes);
routes.use('/appointments', appointmentRoutes);
