import { Router } from 'express';
import { userRoutes } from './user.routes.js';
import { appointmentRoutes } from './appointment.routes.js';

export const routes: Router = Router();

routes.get('/health', (_req, res) => {
  return res.status(200).json({ message: 'Server Health' });
});

routes.use('/users', userRoutes);
routes.use('/appointments', appointmentRoutes);
