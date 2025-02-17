import { Request, Response } from 'express';
import { checkAccess } from '../services/access.service';

export const verifyAccess = async (req: Request, res: Response): Promise<void> => {
  try {
    const allowed = await checkAccess();
    if (allowed) {
      res.json({ message: '✅ Доступ разрешён' });
      return;
    }
    res.status(403).json({ message: '🚫 Доступ запрещён' });
  } catch {
    res.status(500).json({ message: '❌ Ошибка при проверке доступа' });
  }
};
