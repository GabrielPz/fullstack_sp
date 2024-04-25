import { Router } from 'express';
import * as usersController from '../controllers/api-users';

const userRoutes = Router();

userRoutes.get('/api/users', usersController.apiUser);

export default userRoutes;