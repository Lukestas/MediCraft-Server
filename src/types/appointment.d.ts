export interface IAppointment {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  description: string;
  status: 'pending' | 'cancelled' | 'active' | 'late';
}
