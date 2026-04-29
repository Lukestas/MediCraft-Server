import type { Request, Response, NextFunction } from 'express';
import type {
  IDoctor,
  IUser,
  IUserRepository,
  IUserService,
} from '../types/user.js';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
export class UserDataValidator {
  static async createUserData(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing body' });
    }
    try {
      const userType = req.body.type;
      if (!userType) {
        return res.status(400).json({ message: 'Missing user type field' });
      }
      let user: Omit<IUser, 'id' | 'role' | 'specialty'> = req.body.user;
      if (!user.DNI) {
        return res.status(400).json({ message: 'Missing DNI field' });
      }
      const DNIFound = await userService.findDNI(user.DNI);
      if (DNIFound) {
        return res.status(400).json({ message: 'DNI already exists' });
      }
      if (!user.birthdate) {
        return res.status(400).json({ message: 'Missing birthdate field' });
      }
      if (!user.email) {
        return res.status(400).json({ message: 'Missing email field' });
      }
      const emailFound = await userService.findEmail(user.email);
      if (emailFound) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (!user.firstName) {
        return res.status(400).json({ message: 'Missing first name field' });
      }
      if (!user.password) {
        return res.status(400).json({ message: 'Missing password field' });
      }
      let specialty: string = req.body.specialty;
      if (userType === 'doctor' && !specialty) {
        return res.status(400).json({ message: 'Missing specialty field' });
      }
      user.lastName = req.body.lastName ?? 'NaN';
      user.birthdate = new Date(user.birthdate);
      req.body.userType = userType;
      req.body.user = user;
      req.body.specialty = userType === 'doctor' ? specialty : undefined;
      return next();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  static async updateUserData(req: Request, res: Response, next: NextFunction) {
    const id = req.params['id'] as string;
    const user: Omit<IUser | IDoctor, 'id' | 'role' | 'specialty'> =
      req.body.user;

    if (!id) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Missing required user fields' });
    }

    req.body.id = id;
    req.body.user = user;
    console.log(user);
    return next();
  }
}
