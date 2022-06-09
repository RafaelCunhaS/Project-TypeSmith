import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ErrorHandler from '../interfaces/error.interface';

const schema = Joi.object({
  name: Joi.string().required().min(3),
  amount: Joi.string().required().min(3),
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