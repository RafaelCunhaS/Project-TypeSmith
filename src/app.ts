import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import ProductsRouter from './routes/products.routes';
import UsersRouter from './routes/users.routes';
import OrdersRouter from './routes/orders.routes';
import LoginRouter from './routes/login.routes';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter);

app.use('/users', UsersRouter);

app.use('/orders', OrdersRouter);

app.use('/login', LoginRouter);

app.use(errorMiddleware);

export default app;
