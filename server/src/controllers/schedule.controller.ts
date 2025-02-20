import { Request, Response } from 'express';
import { getSchedule, updateSchedule } from '../services/schedule.service';

export const fetchSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const schedule = await getSchedule();
    res.json(schedule);
  } catch {
    res.status(500).json({ message: 'Error fetching schedule' });
  }
};

export const editSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSchedule: Record<string, string> = {};

    for (const day in req.body) {
      const timeRange = req.body[day];

      if (!timeRange || typeof timeRange !== 'string') {
        res.status(400).json({
          message: `❌ Ошибка: Время начала и окончания обязательно для ${day}`,
        });
        return;
      }

      const [start, end] = timeRange.split('-');

      if (!start || !end) {
        res.status(400).json({
          message: `❌ Ошибка: Время начала и окончания обязательно для ${day}`,
        });
        return;
      }

      if (start >= end) {
        res.status(400).json({
          message: `❌ Ошибка: Время начала (${start}) должно быть раньше времени окончания (${end}) для ${day}`,
        });
        return;
      }

      updatedSchedule[day] = `${start}-${end}`;
    }

    await updateSchedule(updatedSchedule);
    res.json({ message: '✅ Расписание успешно обновлено' });
  } catch (error) {
    console.error('Ошибка обновления расписания:', error);
    res.status(500).json({ message: '❌ Ошибка при обновлении расписания' });
  }
};
