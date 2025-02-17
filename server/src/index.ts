import { ENV } from './config';
import app from './app';
import { initializeUsers } from './config/initUsers';
import { initializeSchedule } from './config/initSchedule';

const startServer = async () => {
  await initializeUsers();
  await initializeSchedule();

  const port = ENV.PORT;
  app.listen(port, () => {
    console.log('🚀 Сервер запущен на порту', port);
  });
};

startServer();
