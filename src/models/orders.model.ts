import { Pool, RowDataPacket } from 'mysql2/promise';
import { Order } from '../interfaces/order.interface';

export default class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getProductByOrderId(orderId: number): Promise<number[]> {
    const [products] = await this.connection
      .execute<RowDataPacket[]>('SELECT id FROM Trybesmith.Products WHERE orderId=?', [orderId]);

    const productsIds = products.map(({ id }): number => id);
    
    return productsIds;
  }

  public async getAll(): Promise<Order[]> {
    const [orders] = await this.connection
      .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Orders');

    const getIds = orders.map(({ id }): Promise<number[]> => this.getProductByOrderId(id));

    const productsIds = await Promise.all(getIds);
    
    const result = orders.map((obj, i) => ({ ...obj, productsIds: productsIds[i] }));
    
    return result as Order[];
  }
}