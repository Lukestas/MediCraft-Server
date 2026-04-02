type AppointmentStatus = 'scheduled' | 'cancelled' | 'completed';

export interface IAppointment {
  id?: string;
  patientId: string;
  doctorId: string;
  date: Date;
  description?: string;
  status: AppointmentStatus;
}
