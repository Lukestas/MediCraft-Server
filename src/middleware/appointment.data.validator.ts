import type { Request, Response, NextFunction } from 'express';
import { AppointmentRepository } from '../repositories/appointment.repository.js';
import { AppointmentServices } from '../services/appointment.service.js';
import type { IAppointment } from '../types/appointment.js';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';
import type { IUserRepository, IUserService } from '../types/user.js';
import { now } from 'mongoose';

const appointmentRepository: AppointmentRepository =
  new AppointmentRepository();
const appointmentService = new AppointmentServices(appointmentRepository);

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export class AppointmentDataValidator {
  static async createAppointmentData(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing body' });
    }
    try {
      let appointment: Omit<IAppointment, 'id'> = req.body.appointment;
      if (!appointment.patientId) {
        return res
          .status(400)
          .json({ message: 'Missing patient identification field' });
      }
      const patientFound = await userService.findUserById(
        appointment.patientId,
      );
      if (!patientFound) {
        return res.status(400).json({ message: 'Patient not found' });
      }
      if (!appointment.doctorId) {
        return res
          .status(400)
          .json({ message: 'Missing doctor identification field' });
      }
      const doctorFound = await userService.findUserById(appointment.doctorId);
      if (!doctorFound) {
        return res.status(400).json({ message: 'Doctor not found' });
      }
      if (doctorFound.role !== 'doctor') {
        return res.status(400).json({
          message: "The user's identification does not correspond to a doctor.",
        });
      }
      if (!appointment.date) {
        return res.status(400).json({ message: 'Missing date field' });
      }
      if (!appointment.description) {
        return res.status(400).json({ message: 'Missing description field' });
      }
      //appointment.date = new Date(appointment.date);
      appointment.date = new Date(now());
      appointment.status = 'scheduled';
      appointment.description = appointment.description ?? 'consulta';
      req.body.appointment = appointment;
      return next();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
  static async updateAppointmentData(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const id = req.params['id'] as string;
    const appointment: Omit<IAppointment, 'id' | 'patientId'> =
      req.body.appointment;

    if (!id) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const appointmentFound = await appointmentService.findAppointmentById(id);
    if (!appointmentFound) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if (!appointment.description && !appointment.date) {
      return res.status(400).json({
        message: 'Missing required appointment fields, description or date',
      });
    }
    const doctorFound = await userService.findUserById(appointment.doctorId);
    if (!doctorFound) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    if (doctorFound!.role !== 'doctor') {
      return res.status(400).json({
        message: "The user's identification does not correspond to a doctor.",
      });
    }
    if (!appointment.date) {
      appointment.date = appointmentFound.date;
    }
    if (!appointment.description) {
      appointment.description = appointmentFound.description!;
    }
    if (
      appointment.status !== 'completed' &&
      appointment.status !== 'scheduled' &&
      appointment.status !== 'cancelled'
    ) {
      return res.status(400).json({ message: 'Appointment status invalid' });
    }

    req.body.id = id;
    req.body.appointment = {
      ...appointment,
      patientId: appointmentFound.patientId,
    };
    return next();
  }
}
