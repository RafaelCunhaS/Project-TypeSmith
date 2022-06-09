import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/users.service';
import generateToken from '../utils/generateToken';

export default class UsersController {
  constructor(private usersService = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const { username } = req.body;
    
    const id = await this.usersService.create(req.body);

    const token = generateToken(id, username);

    res.status(StatusCodes.CREATED).json({ token });
  };
}