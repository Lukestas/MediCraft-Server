import express, { type Application } from 'express';
import morgan from 'morgan';
import { corsMiddleware } from '../middleware/cors.js';

export const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(corsMiddleware());
app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Server Health' });
});
