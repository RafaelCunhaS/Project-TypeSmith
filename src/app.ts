import express from 'express';
import 'express-async-errors';
import ProductsRouter from './routes/products.routes';

const app = express();

app.use(express.json());

app.use(ProductsRouter);

export default app;
