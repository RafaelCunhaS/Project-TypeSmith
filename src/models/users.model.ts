import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { LoginUser, User, UserWithId } from '../interfaces/user.interface';

export default class UsersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create({ username, classe, level, password }: User): Promise<number> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [{ insertId }] = result;
    return insertId;
  }

  public async getByUsername({ username }: LoginUser): Promise<UserWithId> {
    const [[result]] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username=?',
      [username],
    );

    return result as UserWithId;
  }
}