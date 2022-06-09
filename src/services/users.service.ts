import { User } from '../interfaces/user.interface';
import connection from '../models/connection';
import UsersModel from '../models/users.model';

export default class UsersService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async create(item: User): Promise<number> {
    const id = await this.model.create(item);
    return id;
  }
}