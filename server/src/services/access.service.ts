import moment from 'moment';
import 'moment/locale/ru';
import { getSchedule } from './schedule.service';

export const checkAccess = async (): Promise<boolean> => {
  try {
    moment.locale('ru');
    let currentDay = moment().format('dddd'); // "понедельник"
    const currentTime = moment().format('HH:mm'); // "22:35"

    // Делаем первую букву заглавной, остальные маленькими ("понедельник" -> "Понедельник")
    currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

    const schedule = await getSchedule();
    console.log(`Текущий день: ${currentDay}, текущее время: ${currentTime}`);
    console.log(`Расписание:`, schedule);

    if (!schedule[currentDay]) {
      console.log('🚫 День отсутствует в расписании!');
      return false;
    }

    // Разбиваем строку "00:00-23:56" в объект { start, end }
    const [start, endRaw] = schedule[currentDay].split('-');
    const end = endRaw === '24:00' ? '23:59' : endRaw; // Исправляем 24:00

    console.log(`Разрешённое время: ${start} - ${end}`);

    if (currentTime >= start && currentTime <= end) {
      console.log('✅ Доступ разрешён');
      return true;
    } else {
      console.log('🚫 Доступ запрещён (вне интервала)');
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка проверки доступа:', error);
    return false;
  }
};
