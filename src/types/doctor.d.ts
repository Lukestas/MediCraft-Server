import type { IUser } from './user.js';

export interface IDoctor extends IUser {
  specialty: string;
  agenda?: string[];
}
