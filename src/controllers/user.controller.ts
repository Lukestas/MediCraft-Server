import type { Request, Response } from 'express';
import type {
  IDoctor,
  IUser,
  IUserRepository,
  IUserService,
} from '../types/user.js';
import { UserFactory } from '../factories/user/user.factory.js';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';
import { DoctorFactory } from '../factories/doctor/doctor.factory.js';

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export class UserController {
  static async create(req: Request, res: Response) {
    const userType = req.body.type;
    if (!userType) {
      return res.status(400).json({ message: 'Missing user type field' });
    }
    const {
      DNI,
      birthdate,
      email,
      firstName,
      password,
    }: {
      DNI: number;
      birthdate: string;
      email: string;
      firstName: string;
      password: string;
    } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: 'Missing body' });
    }
    if (!DNI) {
      return res.status(400).json({ message: 'Missing DNI field' });
    }
    const DNIFound = await userService.findDNI(DNI);
    if (DNIFound) {
      return res.status(400).json({ message: 'DNI already exists' });
    }
    if (!birthdate) {
      return res.status(400).json({ message: 'Missing birthdate field' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Missing email field' });
    }
    const emailFound = await userService.findEmail(email);
    if (emailFound) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (!firstName) {
      return res.status(400).json({ message: 'Missing first name field' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Missing password field' });
    }
    let newUser: Omit<IUser | IDoctor, 'id' | 'role'> = {
      DNI,
      birthdate: new Date(birthdate),
      email,
      firstName,
      password,
      lastName: (req.body.lastName as string) ?? 'NaN',
      status: true,
    };
    if (userType === 'doctor') {
      const doctorSpecialty: string = req.body.specialty;
      if (!doctorSpecialty) {
        return res.status(400).json({ message: 'Missing specialty field' });
      }
      const doctorFactory = DoctorFactory.getFactory(doctorSpecialty);
      if (!doctorFactory) {
        return res.status(400).json({ message: 'Incorrect doctor specialty' });
      }
      newUser = doctorFactory.createDoctor(newUser);
    } else if (userType === 'patient' || userType === 'admin') {
      newUser = UserFactory.createUser(userType, newUser);
    } else {
      return res.status(400).json({ message: 'Incorrect user type' });
    }
    const userSaved = await userService.createUser(newUser);
    return res.status(201).json({ newUser: userSaved });
  }

  static async getAll(req: Request, res: Response) {
    const userType: 'patient' | 'doctor' = req.body.type;
    console.log(req.body.type);
    if (!userType) {
      return res.status(400).json({ message: 'Missing user type field' });
    }
    if (userType !== 'patient' && userType !== 'doctor') {
      return res.status(400).json({ message: 'Incorrect user type' });
    }
    const users = await userService.findUser(userType);
    if (!users) {
      return res.status(404).json({ message: 'Users not found' });
    }
    return res.status(200).json({ users });
  }
}
