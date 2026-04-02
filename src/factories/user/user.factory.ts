import type { IUser } from '../../types/user.js';

type CreateUserData = Omit<IUser, 'role' | 'id'>;

export class UserFactory {
  static createUser(
    type: 'patient' | 'doctor' | 'admin',
    data: CreateUserData,
  ): IUser {
    const baseUser: IUser = {
      ...data,
      role: type,
    };

    switch (type) {
      case 'patient':
        return baseUser;
      case 'doctor':
        return baseUser;
      case 'admin':
        return baseUser;
      default:
        throw new Error('Invalid user type');
    }
  }
}
