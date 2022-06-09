import { ProductWithIds } from '../interfaces/product.interface';
import connection from '../models/connection';
import ProductsModel from '../models/products.model';

export default class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async getAll(): Promise<ProductWithIds[]> {
    const products = await this.model.getAll();
    return products;
  }
}