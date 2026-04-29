import type {
  IAppointment,
  IAppointmentRepository,
  IAppointmentService,
} from '../types/appointment.js';

export class AppointmentServices implements IAppointmentService {
  private appointmentRepository: IAppointmentRepository;
  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }
  async createAppointment(appointment: IAppointment): Promise<IAppointment> {
    return this.appointmentRepository.create(appointment);
  }

  async findAppointment(date: string): Promise<IAppointment[] | null> {
    return this.appointmentRepository.find(date);
  }
  async findAppointmentById(id: string): Promise<IAppointment | null> {
    return this.appointmentRepository.findById(id);
  }

  async updateAppointment(
    id: string,
    appointment: IAppointment,
  ): Promise<IAppointment | null> {
    return this.appointmentRepository.update(id, appointment);
  }

  async deleteAppointment(id: string): Promise<IAppointment | null> {
    return this.appointmentRepository.delete(id);
  }
}
