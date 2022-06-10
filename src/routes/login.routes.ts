import { Router } from 'express';
import LoginController from '../controller/login.controller';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

const ordersController = new LoginController();

router.post('/', validateLogin, ordersController.checkUser);

export default router;