import { UserModel } from '../models/user.model';

const defaultUsers = [
  { email: 'user1@some.com', password: 'user1@some.com' },
  { email: 'user2@some.com', password: 'user2@some.com' },
];

export const initializeUsers = async () => {
  const userCount = await UserModel.countDocuments();
  if (userCount === 0) {
    await UserModel.insertMany(defaultUsers);
    console.log('✅ Пользователи добавлены в базу данных');
  } else {
    console.log('✅ Пользователи уже есть в базе');
  }
};
