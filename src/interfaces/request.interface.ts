import { Request } from 'express';
import { TokenPayload } from '../types/request.types';

export interface RequestUser extends Request{
  user?: TokenPayload
}