import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, ENV.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
