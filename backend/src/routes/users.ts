import { Router } from 'express';
import * as usersController from '../controllers/api-users';

const userRoutes = Router();

userRoutes.get('/api/users', usersController.apiUser);
userRoutes.delete('/api/users', usersController.deleteUserRecords);

export default userRoutes;