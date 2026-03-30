import { Router } from 'express';

export const patientRoutes: Router = Router();

patientRoutes.get('/', (_req, res) => {
  return res.status(200).json({ message: 'You are in Patients' });
});
