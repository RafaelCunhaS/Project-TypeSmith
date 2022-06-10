import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ErrorHandler from '../interfaces/error.interface';

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    throw new ErrorHandler(StatusCodes.BAD_REQUEST, error.message);
  }

  next();
};