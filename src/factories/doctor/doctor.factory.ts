import { CardiologyFactory } from './cardiology.factory.js';
import { DermatologyFactory } from './dermatology.factory.js';
import type { IDoctorFactory } from './doctor-factory.interface.js';

export class DoctorFactory {
  static getFactory(type: string): IDoctorFactory {
    switch (type) {
      case 'cardiology':
        return new CardiologyFactory();
      case 'dermatology':
        return new DermatologyFactory();
      default:
        throw new Error('Invalid specialty');
    }
  }
}
