import type { Repository } from './repository.js';

type UserRole = 'patient' | 'doctor' | 'admin';

export interface IUser {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  birthdate: Date;
  DNI: number;
  role?: UserRole;
  medicalHistory?: string[];
  status: boolean;
}
