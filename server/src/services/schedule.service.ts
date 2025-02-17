import { ScheduleModel } from '../models/schedule.model';

export const getSchedule = async (): Promise<Record<string, string>> => {
  const docs = await ScheduleModel.find({});
  const result: Record<string, string> = {};
  docs.forEach(doc => {
    result[doc.day] = doc.startTime + '-' + doc.endTime;
  });
  return result;
};

export const updateSchedule = async (data: Record<string, string>): Promise<void> => {
  for (const day of Object.keys(data)) {
    const [start, end] = data[day].split('-');
    await ScheduleModel.findOneAndUpdate(
      { day },
      { day, startTime: start, endTime: end },
      { upsert: true }
    );
  }
};
