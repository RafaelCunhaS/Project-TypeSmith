import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import ErrorHandler from '../interfaces/error.interface';

const schema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).required(),
});

export default (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.message.includes('required')) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, error.message);
    }
    throw new ErrorHandler(StatusCodes.UNPROCESSABLE_ENTITY, error.message);
  }

  if (!req.body.productsIds.length) {
    throw new ErrorHandler(
      StatusCodes.UNPROCESSABLE_ENTITY, 
      '"productsIds" must include only numbers',
    );
  }

  next();
};