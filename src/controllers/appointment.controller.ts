import type { Request, Response } from 'express';
import type { IAppointment } from '../types/appointment.js';
import { randomUUID } from 'crypto';
let appointmentList: IAppointment[] = [];
export class AppointmentController {
  static async create(req: Request, res: Response) {
    const appointmentInformation: Omit<IAppointment, 'id'> = req.body;
    if (!appointmentInformation) {
      return res.status(400).json({ message: 'Missing body' });
    }
    if (
      !appointmentInformation.patientId ||
      !appointmentInformation.description ||
      !appointmentInformation.doctorId ||
      !appointmentInformation.date
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newAppointment: IAppointment = {
      id: randomUUID(),
      doctorId: appointmentInformation.doctorId,
      patientId: appointmentInformation.patientId,
      description: appointmentInformation.description,
      status: 'scheduled',
      date: new Date(appointmentInformation.date),
    };
    appointmentList.push(newAppointment);
    return res.status(200).json({ appointment: newAppointment });
  }
  static async getById(req: Request, res: Response) {
    if (!appointmentList) {
      return res.status(400).json({ message: 'Appointmets not found' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const appointmentFound = appointmentList.find(
      (appointment) => appointment.id == req.params['id'],
    );
    if (!appointmentFound) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(201).json({ appointment: appointmentFound });
  }
  static async getAll(_req: Request, res: Response) {
    if (!appointmentList) {
      return res.status(400).json({ message: 'Appointments not found' });
    }
    return res.status(201).json({ appointments: appointmentList });
  }
  static async delete(req: Request, res: Response) {
    if (!appointmentList) {
      return res.status(400).json({ message: 'Appointments not found' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    let appointmentInformation = appointmentList.find(
      (appointment) => appointment.id == req.params['id'],
    );
    if (!appointmentInformation) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const newAppointmentList: IAppointment[] = appointmentList.map(
      (appointment) => {
        if (appointment.id != req.params['id']) {
          return appointment;
        }
        appointmentInformation = { ...appointment, status: 'cancelled' };
        return appointmentInformation;
      },
    );
    appointmentList = newAppointmentList;
    return res.status(200).json({ deleted: appointmentInformation });
  }
  static async update(req: Request, res: Response) {
    if (!appointmentList) {
      return res.status(400).json({ message: 'Appointment not found' });
    }
    const appointmentInformation: Omit<IAppointment, 'id' | 'patientId'> =
      req.body;
    if (!appointmentInformation) {
      return res.status(400).json({ message: 'Missing body' });
    }
    if (
      !appointmentInformation.date ||
      !appointmentInformation.description ||
      !appointmentInformation.doctorId ||
      !appointmentInformation.status
    ) {
      return res
        .status(400)
        .json({ message: 'All fields required or missing required fields' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const appointmentFound = appointmentList.find(
      (appointment) => appointment.id == req.params['id'],
    );
    if (!appointmentFound) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    const data: IAppointment = {
      id: req.params['id'] as string,
      doctorId: appointmentInformation.doctorId ?? appointmentFound.doctorId,
      patientId: appointmentFound.patientId,
      status: 'scheduled',
      description:
        appointmentInformation.description ?? appointmentFound.description,
      date: new Date(appointmentInformation.date) ?? appointmentFound.date,
    };
    const newAppointmentList: IAppointment[] = appointmentList.map(
      (appointment) => {
        if (appointment.id != data.id) {
          return appointment;
        }
        return data;
      },
    );
    appointmentList = newAppointmentList;
    return res.status(201).json({ appointment: data });
  }
}
