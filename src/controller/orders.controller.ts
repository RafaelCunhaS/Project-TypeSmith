import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestUser } from '../interfaces/request.interface';
import OrdersService from '../services/orders.service';
import { TokenPayload } from '../types/request.types';

export default class OrdersController {
  constructor(private ordersService = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.ordersService.getAll();
    res.status(StatusCodes.OK).json(orders);
  };

  public create = async (req: RequestUser, res: Response) => {
    const { userId } = req.user as TokenPayload;
    const info = await this.ordersService.create(userId, req.body);
    res.status(StatusCodes.CREATED).json(info);
  };
}