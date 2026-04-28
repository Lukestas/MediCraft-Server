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

export interface IDoctor extends IUser {
  specialty: string;
}

export interface IUserRepository extends Repository<IUser | IDoctor> {
  findOne(query: Query): Promise<IUser | IDoctor | null>;
}

export interface IUserService {
  createUser(user: IUser | IDoctor): Promise<IUser | IDoctor>;
  findUser(type: string): Promise<IUser[] | IDoctor[] | null>;
  findUserById(id: string): Promise<IUser | IDoctor | null>;
  findDNI(DNI: number): Promise<IUser | IDoctor | null>;
  findEmail(email: string): Promise<IUser | IDoctor | null>;
  updateUser(
    id: string,
    user: Partial<IUser | IDoctor>,
  ): Promise<IUser | IDoctor | null>;
  deleteUser(id: string): Promise<boolean>;
}
