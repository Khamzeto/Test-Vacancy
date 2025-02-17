import { Request, Response } from 'express';
import { authenticate } from '../services/auth.service';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const token = await authenticate(email, password);
  if (!token) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  res.json({ token });
};
