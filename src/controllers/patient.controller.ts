import { randomUUID } from 'crypto';
import type { IUser } from '../types/user.js';
import type { Request, Response } from 'express';
import { UserFactory } from '../factories/user/user.factory.js';

let patientList: IUser[] = [];
export class PatientController {
  static async getAll(_req: Request, res: Response) {
    if (!patientList) {
      return res.status(404).json({ message: 'Patients not found' });
    }
    return res.status(200).json({ patients: patientList });
  }

  static async getById(req: Request, res: Response) {
    if (!patientList) {
      return res.status(404).json({ message: 'Patients not found' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const patientInformation = patientList.find(
      (admin) => admin.id == req.params['id'],
    );
    if (!patientInformation) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    return res.status(200).json({ patient: patientInformation });
  }
  static async create(req: Request, res: Response) {
    const patientInformation: Omit<IUser, 'role' | 'id'> = req.body;
    if (!patientInformation) {
      return res.status(400).json({ message: 'Missing body' });
    }
    if (
      !patientInformation.DNI ||
      !patientInformation.birthdate ||
      !patientInformation.email ||
      !patientInformation.firstName ||
      !patientInformation.password
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const data: IUser = {
      id: randomUUID(),
      email: patientInformation.email,
      DNI: patientInformation.DNI,
      birthdate: new Date(patientInformation.birthdate),
      firstName: patientInformation.firstName,
      password: patientInformation.password,
      lastName: patientInformation.lastName ?? '',
      medicalHistory: [],
      status: true,
    };

    const newPatient = UserFactory.createUser('patient', data);
    patientList.push(newPatient);
    return res.status(201).json({ user: newPatient });
  }

  static async update(req: Request, res: Response) {
    if (!patientList) {
      return res.status(404).json({ message: 'Patients not found' });
    }

    const patientInformation: Omit<IUser, 'id' | 'role'> = req.body;
    if (!patientInformation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (
      !patientInformation.DNI ||
      !patientInformation.birthdate ||
      !patientInformation.email ||
      !patientInformation.firstName ||
      !patientInformation.password
    ) {
      return res
        .status(400)
        .json({ message: 'All fields required or missing required fields' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const patientFound = patientList.find(
      (patient) => patient.id == req.params['id'],
    );
    if (!patientFound) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const data: IUser = {
      id: req.params['id'] as string,
      email: patientInformation.email ?? patientFound!.email,
      password: patientInformation.password ?? patientFound!.password,
      firstName: patientInformation.firstName ?? patientFound!.firstName,
      lastName: patientInformation.lastName ?? patientFound!.lastName ?? '',
      birthdate:
        new Date(patientInformation.birthdate) ?? patientFound!.birthdate,
      DNI: patientInformation.DNI ?? patientFound!.DNI,
      medicalHistory:
        patientInformation.medicalHistory ?? patientFound!.medicalHistory ?? [],
      status: true,
    };
    const newPatientList: IUser[] = patientList.map((patient) => {
      if (patient.id != data.id) {
        return patient;
      }
      data.role = patient.role!;
      return data;
    });
    patientList = newPatientList;
    return res.status(201).json({ patient: data });
  }
  static async delete(req: Request, res: Response) {
    if (!patientList) {
      return res.status(404).json({ message: 'Patients not found' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    let patientInformation: IUser | undefined = patientList.find(
      (patient) => patient.id == req.params['id'],
    );
    if (!patientInformation) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const newPatientList = patientList.map((patient) => {
      if (patient.id != req.params['id']) {
        return patient;
      }
      patientInformation = { ...patient, status: false };
      return patientInformation;
    });
    patientList = newPatientList;
    return res.status(200).json({ deleted: patientInformation });
  }
}
