import { CreatedOrder, Order, ReceiveOrder } from '../interfaces/order.interface';
import connection from '../models/connection';
import OrdersModel from '../models/orders.model';

export default class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(userId: number, items: ReceiveOrder): Promise<CreatedOrder> {
    const info = await this.model.create(userId, items);
    return info;
  }
}