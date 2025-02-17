import { ScheduleModel } from '../models/schedule.model';

const defaultSchedule = [
  { day: 'Понедельник', startTime: '00:00', endTime: '24:00' },
  { day: 'Вторник', startTime: '00:00', endTime: '24:00' },
  { day: 'Среда', startTime: '00:00', endTime: '24:00' },
  { day: 'Четверг', startTime: '00:00', endTime: '24:00' },
  { day: 'Пятница', startTime: '00:00', endTime: '24:00' },
  { day: 'Суббота', startTime: '00:00', endTime: '24:00' },
  { day: 'Воскресенье', startTime: '00:00', endTime: '24:00' },
];

export const initializeSchedule = async () => {
  const count = await ScheduleModel.countDocuments();
  if (count === 0) {
    await ScheduleModel.insertMany(defaultSchedule);
    console.log('✅ Расписание инициализировано в базе');
  } else {
    console.log('✅ Расписание уже существует');
  }
};
