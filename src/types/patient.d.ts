import type { IUser } from './user.js';

export interface IPatient extends IUser {
  history: string[];
}
