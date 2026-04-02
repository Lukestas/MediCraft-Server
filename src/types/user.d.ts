export interface IUser {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  birthdate: Date;
  DNI: string;
  role: 'patient' | 'doctor' | 'admin';
}
