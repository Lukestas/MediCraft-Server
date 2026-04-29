import type { Request, Response } from 'express';
import type { IAppointment } from '../types/appointment.js';
import { AppointmentRepository } from '../repositories/appointment.repository.js';
import { AppointmentServices } from '../services/appointment.service.js';
import { UserService } from '../services/user.service.js';
import { UserRepository } from '../repositories/user.repository.js';
import type { IUserRepository, IUserService } from '../types/user.js';

const appointmentRepository: AppointmentRepository =
  new AppointmentRepository();
const appointmentService = new AppointmentServices(appointmentRepository);
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
export class AppointmentController {
  static async create(req: Request, res: Response) {
    const appointment: IAppointment = req.body.appointment;
    const newAppointment =
      await appointmentService.createAppointment(appointment);
    let userFound = await userService.findUserById(appointment.patientId);
    if (!userFound) {
      return res.status(404).json({ message: 'User not found' });
    }
    userFound.medicalHistory?.push(newAppointment.id!);
    const updateUser = await userService.updateUser(userFound.id!, userFound);
    if (!updateUser) {
      return res.status(400).json({ message: 'User not updated' });
    }
    return res.status(201).json({ newAppointment });
  }

  static async getAll(req: Request, res: Response) {
    let limit = req.body.limit as string;
    if (!limit) {
      limit = '0001-01-01';
    }
    const appointment = await appointmentService.findAppointment(limit);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointments not found' });
    }
    return res.status(200).json({ appointment });
  }

  static async getById(req: Request, res: Response) {
    const id = req.params['id'] as string;
    if (!id) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const appointment = await appointmentService.findAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json({ appointment });
  }

  static async update(req: Request, res: Response) {
    const { id, appointment } = req.body;
    const updateAppointment = await appointmentService.updateAppointment(
      id,
      appointment,
    );
    if (!updateAppointment) {
      return res.status(404).json({ message: 'Appointment not updated' });
    }
    return res.status(200).json({ updateAppointment });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params['id'] as string;
    if (!id) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const appointment = await appointmentService.deleteAppointment(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json({ appointment });
  }
}
