import { UserModel } from '../models/user.model.js';

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

  async findDNI(DNI: number): Promise<IUser | IDoctor | null> {
    return await UserModel.findOne({ DNI: DNI }).exec();
  }

  async findEmail(email: string): Promise<IUser | IDoctor | null> {
    return await UserModel.findOne({ email: email }).exec();
  }

  async update(
    id: string,
    data: IUser | IDoctor,
  ): Promise<IUser | IDoctor | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await UserModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
