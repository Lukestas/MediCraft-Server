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
    const { userType, user, specialty } = req.body;

    let newUser: IUser | IDoctor | null;

    if (userType === 'doctor') {
      const doctorFactory = DoctorFactory.getFactory(specialty);

      if (!doctorFactory) {
        return res.status(400).json({ message: 'Incorrect doctor specialty' });
      }

      newUser = doctorFactory.createDoctor(user);
    } else if (userType === 'patient' || userType === 'admin') {
      newUser = UserFactory.createUser(userType, user);
    } else {
      return res.status(400).json({ message: 'Incorrect user type' });
    }
    if (!newUser) {
      return res.status(400).json({ message: 'Error adding a new doctor' });
    }
    const userSaved = await userService.createUser(newUser);

    return res.status(201).json({ newUser: userSaved });
  }

  static async getAll(req: Request, res: Response) {
    const userType: 'patient' | 'doctor' = req.body.type;
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
    return res.status(201).json({ users });
  }

  static async getById(req: Request, res: Response) {
    const id = req.params['id'] as string;
    if (!id) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  }

  static async update(req: Request, res: Response) {
    const { id, user } = req.body;
    const updateUser = await userService.updateUser(id, user);
    if (!updateUser) {
      return res.status(404).json({ message: 'User not found or not updated' });
    }
    return res.status(200).json({ updateUser });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params['id'] as string;
    if (!id) {
      return res.status(400).json({ message: 'Missing identification' });
    }
    const softDeleteUser = await userService.deleteUser(id);
    if (!softDeleteUser) {
      return res.status(404).json({ message: 'User not found or not updated' });
    }
    return res.status(200).json({ softDeleteUser });
  }
}
