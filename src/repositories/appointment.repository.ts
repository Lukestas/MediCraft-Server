import { AppointmentModel } from '../models/appointment.model.js';
import type {
  IAppointment,
  IAppointmentRepository,
} from '../types/appointment.js';

export class AppointmentRepository implements IAppointmentRepository {
  async create(data: IAppointment): Promise<IAppointment> {
    const newAppointment = new AppointmentModel(data);
    return await newAppointment.save();
  }

  async find(type: string): Promise<IAppointment[] | null> {
    const date = new Date(type);
    const appointment = AppointmentModel.find({ date: { $gt: date } }).exec();
    return appointment;
  }

  async findById(id: string): Promise<IAppointment | null> {
    return await AppointmentModel.findById(id).exec();
  }

  async update(
    id: string,
    data: Partial<IAppointment>,
  ): Promise<IAppointment | null> {
    return await AppointmentModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    }).exec();
  }

  async delete(id: string): Promise<IAppointment | null> {
    let appointment: IAppointment | null =
      await AppointmentModel.findById(id).exec();
    if (!appointment) {
      return null;
    }
    appointment.status = 'cancelled';
    const softDeleteAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      appointment,
      {
        returnDocument: 'after',
      },
    ).exec();
    return softDeleteAppointment;
  }
}
