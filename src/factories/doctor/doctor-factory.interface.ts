import type { IDoctor } from '../../types/doctor.js';

export interface IDoctorFactory {
  createDoctor(data: Omit<IDoctor, 'specialty' | 'id' | 'role'>): IDoctor;
  createSpecialty(): { name: string };
}
