import { Router } from 'express';
import UsersController from '../controller/users.controller';
import validateUser from '../middlewares/validateUser';

const router = Router();

const usersController = new UsersController();

router.post('/', validateUser, usersController.create);

export default router;