import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ErrorHandler from '../interfaces/error.interface';

const schema = Joi.object({
  username: Joi.string().required().min(3),
  classe: Joi.string().required().min(3),
  level: Joi.number().required().min(1),
  password: Joi.string().required().min(8),
});

export default (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.message.includes('required')) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, error.message);
    }
    throw new ErrorHandler(StatusCodes.UNPROCESSABLE_ENTITY, error.message);
  }

  next();
};