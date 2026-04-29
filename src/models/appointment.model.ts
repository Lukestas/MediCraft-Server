import mongoose, { Schema } from 'mongoose';
import type { IAppointment } from '../types/appointment.js';

const appointmentSchema: Schema = new Schema<IAppointment>(
  {
    date: { type: Date, required: true },
    patientId: { type: String, ref: 'users' },
    doctorId: { type: String, ref: 'users' },
    description: { type: String, default: 'Consulta' },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export const AppointmentModel = mongoose.model<IAppointment>(
  'Appointment',
  appointmentSchema,
);
