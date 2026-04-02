import type { IDoctor } from '../../types/doctor.js';
import type { IDoctorFactory } from './doctor-factory.interface.js';

type CreateDoctorData = Omit<IDoctor, 'specialty' | 'role' | 'id'>;

export class CardiologyFactory implements IDoctorFactory {
  createDoctor(data: CreateDoctorData): IDoctor {
    return {
      ...data,
      role: 'doctor',
      specialty: 'cardiology',
    };
  }
  createSpecialty(): { name: string } {
    return {
      name: 'cardiology',
    };
  }
}
