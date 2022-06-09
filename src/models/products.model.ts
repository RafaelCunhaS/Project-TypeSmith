import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Product, ProductWithoutIds, ProductWithId } from '../interfaces/product.interface';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const [result] = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    return result as Product[];
  }

  public async create(item: ProductWithoutIds): Promise<ProductWithId> {
    const { name, amount } = item;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [{ insertId }] = result;
    return { id: insertId, ...item };
  }
}