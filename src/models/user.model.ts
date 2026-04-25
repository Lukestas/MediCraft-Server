import mongoose, { Schema } from 'mongoose';
import type { IUser, IDoctor } from '../types/user.js';

const userSchema: Schema = new Schema<IUser | IDoctor>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, default: 'NaN' },
    birthdate: { type: Date, required: true },
    DNI: { type: Number, required: true, unique: true },
    role: { type: String, required: true },
    medicalHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'appointments' },
    ],
    status: { type: Boolean, default: true },
    specialty: { type: String },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser | IDoctor>('User', userSchema);
