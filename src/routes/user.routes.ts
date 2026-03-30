import { Router } from 'express';

export const userRoutes: Router = Router();

userRoutes.get('/', (_req, res) => {
  return res.status(200).json({ message: 'You are in Users' });
});
