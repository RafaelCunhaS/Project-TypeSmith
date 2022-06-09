import { Router } from 'express';
import ProductsController from '../controller/products.controller';
import validateProduct from '../middlewares/validateProduct';

const router = Router();

const productsController = new ProductsController();

router.get('/products', productsController.getAll);

router.post('/products', validateProduct, productsController.create);

export default router;