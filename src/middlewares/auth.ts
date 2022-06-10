import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ErrorHandler from '../interfaces/error.interface';
import { RequestUser } from '../interfaces/request.interface';

export default async (req: RequestUser, _res: Response, next: NextFunction) => {
  const JWT_SECRET = 'senhasupersecreta';
  const token = req.headers.authorization;

  if (!token) throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Token not found');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    req.user = decoded.data;

    next();
  } catch (err) {
    throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }
};