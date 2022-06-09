import { Router } from 'express';
import ProductsController from '../controller/products.controller';
import validateProduct from '../middlewares/validateProduct';

const router = Router();

const productsController = new ProductsController();

router.get('/', productsController.getAll);

router.post('/', validateProduct, productsController.create);

export default router;