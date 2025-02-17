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
    await updateSchedule(req.body);
    res.json({ message: 'Schedule updated successfully' });
  } catch {
    res.status(500).json({ message: 'Error updating schedule' });
  }
};
