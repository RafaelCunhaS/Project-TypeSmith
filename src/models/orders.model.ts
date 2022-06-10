import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { CreatedOrder, Order, ReceiveOrder } from '../interfaces/order.interface';

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

  public async updateProducts(productId: number, orderId: number): Promise<void> {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId=? WHERE id=?',
      [orderId, productId],
    );
  }

  public async create(userId: number, { productsIds }: ReceiveOrder): Promise<CreatedOrder> {
    const result = productsIds.map((_id) => this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    ));

    const resolved = await Promise.all(result);
    
    const updated = resolved
      .map(([{ insertId }], i) => this.updateProducts(productsIds[i], insertId));

    await Promise.all(updated);

    return { userId, productsIds };
  }
}