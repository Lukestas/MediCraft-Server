import cors from 'cors';
import { ACCEPTED_ORIGINS } from '../config/env.js';

export const corsMiddleware = () => {
  return cors({
    origin: (origin: string | undefined, callback) => {
      console.log(ACCEPTED_ORIGINS);
      if (ACCEPTED_ORIGINS?.includes(origin as string)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error('Origin not allowed'));
    },
  });
};
