import type { IUser } from '../../types/user.js';

type CreateUserData = Omit<IUser, 'role' | 'id'>;

export class UserFactory {
  static createUser(
    type: 'patient' | 'admin',
    data: CreateUserData,
  ): IUser | null {
    const baseUser: IUser = {
      ...data,
      role: type,
    };

    switch (type) {
      case 'patient':
        return baseUser;
      case 'admin':
        return baseUser;
      default:
        return null;
    }
  }
}
