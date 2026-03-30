import { Router } from 'express';

export const doctorRoutes: Router = Router();

doctorRoutes.get('/', (_req, res) => {
  return res.status(200).json({ message: 'You are in Doctors' });
});
