import { Router } from 'express';
import OrdersController from '../controller/orders.controller';
import auth from '../middlewares/auth';
import validateOrder from '../middlewares/validateOrder';

const router = Router();

const ordersController = new OrdersController();

router.get('/', ordersController.getAll);

router.post('/', auth, validateOrder, ordersController.create);

export default router;