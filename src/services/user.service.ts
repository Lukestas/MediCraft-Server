import type {
  IUser,
  IDoctor,
  IUserRepository,
  IUserService,
} from '../types/user.js';

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: IUser): Promise<IUser | IDoctor> {
    return this.userRepository.create(user);
  }

  async findUser(type: string): Promise<IUser[] | IDoctor[] | null> {
    return this.userRepository.find(type);
  }

  async findUserById(id: string): Promise<IUser | IDoctor | null> {
    return this.userRepository.findById(id);
  }

  async findDNI(DNI: number): Promise<IUser | IDoctor | null> {
    return this.userRepository.findOne({ DNI });
  }

  async findEmail(email: string): Promise<IUser | IDoctor | null> {
    return this.userRepository.findOne({ email });
  }

  async updateUser(
    id: string,
    user: Partial<IUser>,
  ): Promise<IUser | IDoctor | null> {
    return this.userRepository.update(id, user);
  }
  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
