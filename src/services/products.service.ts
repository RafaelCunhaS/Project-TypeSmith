import { Product, ProductWithId, ProductWithoutIds } from '../interfaces/product.interface';
import connection from '../models/connection';
import ProductsModel from '../models/products.model';

export default class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(item: ProductWithoutIds): Promise<ProductWithId> {
    const product = await this.model.create(item);
    return product;
  }
}