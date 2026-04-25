import type { IDoctor } from '../../types/user.js';
import type { IDoctorFactory } from './doctor-factory.interface.js';

type CreateDoctorData = Omit<IDoctor, 'specialty' | 'role' | 'id'>;

export class DermatologyFactory implements IDoctorFactory {
  createDoctor(data: CreateDoctorData): IDoctor {
    return {
      ...data,
      role: 'doctor',
      specialty: 'dermatology',
    };
  }
}
