import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import ProductsRouter from './routes/products.routes';
import UsersRouter from './routes/users.routes';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter);

app.use('/users', UsersRouter);

app.use(errorMiddleware);

export default app;
