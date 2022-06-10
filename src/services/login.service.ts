import { StatusCodes } from 'http-status-codes';
import ErrorHandler from '../interfaces/error.interface';
import { LoginUser, UserWithId } from '../interfaces/user.interface';
import connection from '../models/connection';
import UsersModel from '../models/users.model';

export default class LoginService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async checkUser(loginUser: LoginUser): Promise<UserWithId> {
    const user = await this.model.getByUsername(loginUser);

    if (!user || user.password !== loginUser.password) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Username or password invalid');
    }

    return user as UserWithId;
  }
}