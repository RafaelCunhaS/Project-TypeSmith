import { Pool } from 'mysql2/promise';
import { ProductWithIds } from '../interfaces/product.interface';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<ProductWithIds[]> {
    const [result] = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    return result as ProductWithIds[];
  }
}