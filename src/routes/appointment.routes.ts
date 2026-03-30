import { Router } from 'express';

export const appointmentRoutes: Router = Router();

appointmentRoutes.get('/', (_req, res) => {
  return res.status(200).json({ message: 'You are in Appointments' });
});
