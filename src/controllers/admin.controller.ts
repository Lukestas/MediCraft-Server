import type { Request, Response } from 'express';
import type { IUser } from '../types/user.js';
import { randomUUID } from 'node:crypto';
import { UserFactory } from '../factories/user/user.factory.js';

let adminList: IUser[] = [];

export class AdminController {
  static async getById(req: Request, res: Response) {
    if (!adminList) {
      return res.status(404).json({ message: 'Admins not found' });
    }
    const adminInformation: IUser | undefined = adminList.find(
      (admin) => admin.id == req.params['id'],
    );
    if (!adminInformation) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.status(200).json({ admin: adminInformation });
  }

  static async create(req: Request, res: Response) {
    const adminInformation: Omit<IUser, 'id' | 'role'> = req.body;
    if (!adminInformation) {
      return res.status(400).json({ message: 'Missing body' });
    }
    if (
      !adminInformation.DNI ||
      !adminInformation.birthdate ||
      !adminInformation.email ||
      !adminInformation.firstName ||
      !adminInformation.password
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const data: IUser = {
      id: randomUUID(),
      email: adminInformation.email,
      password: adminInformation.password,
      firstName: adminInformation.firstName,
      lastName: adminInformation.lastName ?? '',
      birthdate: new Date(adminInformation.birthdate),
      DNI: adminInformation.DNI,
      medicalHistory: [],
      status: true,
    };
    const adminFactory: IUser = UserFactory.createUser('admin', data);
    adminList.push(adminFactory);
    console.log(adminList);
    return res.status(201).json({ user: adminFactory });
  }
  static async delete(req: Request, res: Response) {
    if (!adminList) {
      return res.status(404).json({ message: 'Admins not found' });
    }
    let AdminInformation: IUser | undefined = adminList.find(
      (admin) => admin.id == req.params['id'],
    );
    if (!AdminInformation) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const newAdminList = adminList.filter(
      (admin) => admin.id != AdminInformation.id,
    );

    adminList = newAdminList;
    return res.status(201).json({ delete: AdminInformation });
  }
  static async update(req: Request, res: Response) {
    if (!adminList) {
      return res.status(404).json({ message: 'Admins not found' });
    }
    const adminInformation: Omit<IUser, 'role' | 'id'> = req.body;
    if (!adminInformation) {
      res.status(400).json({ message: 'Missing body' });
    }
    if (
      !adminInformation.DNI ||
      !adminInformation.birthdate ||
      !adminInformation.email ||
      !adminInformation.firstName ||
      !adminInformation.password
    ) {
      return res
        .status(400)
        .json({ message: 'All fields required or missing required fields' });
    }
    if (!req.params['id']) {
      return res.status(400).json({ message: 'Missing identification' });
    }

    const adminFound = adminList.find((admin) => admin.id == req.params['id']);
    if (!adminFound) {
      res.status(404).json({ message: 'Admin not found' });
    }

    const data: IUser = {
      id: req.params['id'] as string,
      email: adminInformation.email ?? adminFound!.email,
      password: adminInformation.password ?? adminFound!.password,
      firstName: adminInformation.firstName ?? adminFound!.firstName,
      lastName: adminInformation.lastName ?? adminFound!.lastName ?? '',
      birthdate: new Date(adminInformation.birthdate) ?? adminFound!.birthdate,
      DNI: adminInformation.DNI ?? adminFound!.DNI,
      medicalHistory:
        adminInformation.medicalHistory ?? adminFound!.medicalHistory ?? [],
      status: true,
    };

    const adminFactory: IUser = UserFactory.createUser('admin', data);
    const newAdminList = adminList.filter((admin) => {
      if (admin.id != adminFactory.id) {
        return admin;
      }
      return adminFactory;
    });
    adminList = newAdminList;
    return res.status(201).json({ user: adminFactory });
  }
}
