import jwt from 'jsonwebtoken';
import { ENV } from '../config';
import { UserModel } from '../models/user.model';

export const authenticate = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await UserModel.findOne({ email, password });
  if (user) {
    const token = jwt.sign({ email }, ENV.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
  return null;
};
