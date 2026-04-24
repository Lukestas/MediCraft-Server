import type { Request, Response } from 'express';
import type { IDoctor } from '../types/doctor.js';
import { randomUUID } from 'crypto';
import { DoctorFactory } from '../factories/doctor/doctor.factory.js';
import type { IUser } from '../types/user.js';

let doctorList: IDoctor[] = [];

export class DoctorController {
  static async getAll(_req: Request, res: Response) {
    if (!doctorList) {
      return res.status(404).json({ message: 'Doctors not found' });
    }
    return res.status(200).json({ doctors: doctorList });
  }
  static async getById(req: Request, res: Response) {
    if (!doctorList) {
      return res.status(404).json({ message: 'Doctors not found' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const doctorInformation = doctorList.find(
      (doctor) => doctor.id == req.params['id'],
    );
    if (!doctorInformation) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.status(200).json({ doctor: doctorInformation });
  }
  static async create(req: Request, res: Response) {
    const doctorInformation: Omit<IDoctor, 'role' | 'id'> = req.body;
    if (!doctorInformation) {
      return res.status(400).json({ message: 'Missing body' });
    }
    if (
      !doctorInformation.DNI ||
      !doctorInformation.birthdate ||
      !doctorInformation.email ||
      !doctorInformation.firstName ||
      !doctorInformation.password ||
      !doctorInformation.specialty
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const doctorFactory = DoctorFactory.getFactory(doctorInformation.specialty);

    const data: IUser = {
      id: randomUUID(),
      email: doctorInformation.email,
      DNI: doctorInformation.DNI,
      birthdate: new Date(doctorInformation.birthdate),
      firstName: doctorInformation.firstName,
      password: doctorInformation.password,
      lastName: doctorInformation.lastName ?? '',
      medicalHistory: [],
      status: true,
    };

    const newDoctor: IDoctor = doctorFactory.createDoctor(data);
    doctorList.push(newDoctor);
    return res.status(201).json({ doctor: newDoctor });
  }

  static async delete(req: Request, res: Response) {
    if (!doctorList) {
      return res.status(404).json({ message: 'Doctors not found' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    let doctorInformation: IDoctor | undefined = doctorList.find(
      (doctor) => doctor.id == req.params['id'],
    );
    if (!doctorInformation) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const newDoctorList: IDoctor[] = doctorList.map((doctor) => {
      if (doctor.id != req.params['id']) {
        return doctor;
      }
      doctorInformation = { ...doctor, status: false };
      return doctorInformation;
    });
    doctorList = newDoctorList;
    return res.status(200).json({ deleted: doctorInformation });
  }

  static async update(req: Request, res: Response) {
    if (!doctorList) {
      return res.status(404).json({ message: 'Doctors not found' });
    }
    const doctorInformation: Omit<IDoctor, 'role' | 'id'> = req.body;
    if (!doctorInformation) {
      res.status(400).json({ message: 'Missing body' });
    }
    if (
      !doctorInformation.DNI ||
      !doctorInformation.birthdate ||
      !doctorInformation.email ||
      !doctorInformation.firstName ||
      !doctorInformation.password ||
      !doctorInformation.specialty
    ) {
      return res
        .status(400)
        .json({ message: 'All fields required or missing required fields' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }

    const doctorFound = doctorList.find(
      (doctor) => doctor.id == req.params['id'],
    );
    if (!doctorFound) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const data: IUser = {
      id: req.params['id'] as string,
      email: doctorInformation.email ?? doctorFound!.email,
      password: doctorInformation.password ?? doctorFound!.password,
      firstName: doctorInformation.firstName ?? doctorFound!.firstName,
      lastName: doctorInformation.lastName ?? doctorFound!.lastName ?? '',
      birthdate:
        new Date(doctorInformation.birthdate) ?? doctorFound!.birthdate,
      DNI: doctorInformation.DNI ?? doctorFound!.DNI,
      medicalHistory:
        doctorInformation.medicalHistory ?? doctorFound!.medicalHistory ?? [],
      status: true,
    };

    const factory = DoctorFactory.getFactory(doctorInformation.specialty);
    const doctorFactory: IDoctor = factory.createDoctor(data);
    const newDoctorList = doctorList.map((doctor) => {
      if (doctor.id != doctorFactory.id) {
        return doctor;
      }
      return doctorFactory;
    });
    doctorList = newDoctorList;
    return res.status(201).json({ user: doctorFactory });
  }
}
