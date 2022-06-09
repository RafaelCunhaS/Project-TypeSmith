import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (userId: number, username: string): string => {
  const jwtConfig = {
    expiresIn: '1d',
  };
  
  const token = jwt.sign(
    { data: { userId, username } },
    JSON.stringify(process.env.JWT_SECRET),
    jwtConfig,
  );

  return token;
};