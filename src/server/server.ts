import express, { type Application } from 'express';
import morgan from 'morgan';

export const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Server Health' });
});
