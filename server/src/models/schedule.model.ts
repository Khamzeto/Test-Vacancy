import { Schema, model, Document } from 'mongoose';

export interface ISchedule extends Document {
  day: string;
  startTime: string;
  endTime: string;
}

const scheduleSchema = new Schema<ISchedule>({
  day: { type: String, required: true, unique: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export const ScheduleModel = model<ISchedule>('Schedule', scheduleSchema);
