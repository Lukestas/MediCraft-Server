import type { Repository } from './repository.js';

type AppointmentStatus = 'scheduled' | 'cancelled' | 'completed';

export interface IAppointment {
  id?: string;
  patientId: string;
  doctorId: string;
  date: Date;
  description?: string;
  status: AppointmentStatus;
}

export interface IAppointmentRepository extends Repository<IAppointment> {}

export interface IAppointmentService {
  createAppointment(appointment: IAppointment): Promise<IAppointment>;
  findAppointment(date: string): Promise<IAppointment[] | null>;
  findAppointmentById(id: string): Promise<IAppointment | null>;
  updateAppointment(
    id: string,
    appointment: IAppointment,
  ): Promise<IAppointment | null>;
  deleteAppointment(id: string): Promise<IAppointment | null>;
}
