import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller.js';

export const patientRoutes: Router = Router();

patientRoutes.post('/', PatientController.create);
patientRoutes.get('/', PatientController.getAll);
patientRoutes.put('/:id', PatientController.update);
patientRoutes.get('/:id', PatientController.getById);
patientRoutes.delete('/:id', PatientController.delete);
