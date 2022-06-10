import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';
import generateToken from '../utils/generateToken';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public checkUser = async (req: Request, res: Response) => {
    const user = await this.loginService.checkUser(req.body);

    const token = generateToken(user.id, user.username);

    res.status(StatusCodes.OK).json({ token });
  };
}