import { UserModel } from '../models/user.model.js';
import type { Query } from '../types/repository.js';

import type { IUser, IDoctor, IUserRepository } from '../types/user.js';

export class UserRepository implements IUserRepository {
  async create(data: IUser | IDoctor): Promise<IUser | IDoctor> {
    const newUser = new UserModel(data);
    return await newUser.save();
  }

  async find(type: string): Promise<IUser[] | IDoctor[] | null> {
    return await UserModel.find({ role: type }).exec();
  }

  async findById(id: string): Promise<IUser | IDoctor | null> {
    return await UserModel.findById(id).exec();
  }

  async findOne(query: Query): Promise<IUser | IDoctor | null> {
    return await UserModel.findOne(query);
  }

  async update(
    id: string,
    data: IUser | IDoctor,
  ): Promise<IUser | IDoctor | null> {
    return await UserModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    }).exec();
  }

  async delete(id: string): Promise<IUser | IDoctor | null> {
    let user: IUser | IDoctor | null = await UserModel.findById(id).exec();
    if (!user) {
      return null;
    }
    user.status = false;
    const softDeleteUser = await UserModel.findByIdAndUpdate(id, user, {
      returnDocument: 'after',
    }).exec();
    return softDeleteUser;
  }
}
