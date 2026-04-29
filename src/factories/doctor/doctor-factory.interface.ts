import type { IDoctor } from '../../types/user.js';

export interface IDoctorFactory {
  createDoctor(data: Omit<IDoctor, 'specialty' | 'id' | 'role'>): IDoctor;
}
