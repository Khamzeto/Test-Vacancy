# **Backend Setup**

## **1. Установка и запуск**

Для развертывания сервера выполните следующие команды:

```sh
cd server
npm install
npm run dev
```

Сервер по умолчанию будет доступен по адресу: **http://localhost:5004/**

---

## **2. Требования**

- **Node.js** версии `18` или выше (рекомендуется LTS-версия)
- **MongoDB** версии `4.4` или выше (локально или в облаке)
- **Файл `.env`** с необходимыми переменными

Перед запуском убедитесь, что **MongoDB работает** и доступен по `MONGO_URI`.

---

## **3. Переменные окружения (`.env`)**

Создан env(при необходимости можно менять)

```env
PORT=5004
MONGO_URI=mongodb://localhost:27017/access-schedule
JWT_SECRET=supersecret
```

### **Описание переменных**

- `PORT` – порт, на котором будет работать сервер (по умолчанию `5004`).
- `MONGO_URI` – строка подключения к MongoDB. Для локального запуска можно использовать `mongodb://localhost:27017/access-schedule`.
- `JWT_SECRET` – секретный ключ для генерации JWT-токенов.

---

## **4. Доступные API-эндпоинты**

### **Авторизация**

| Метод  | URL          | Описание                                            |
| ------ | ------------ | --------------------------------------------------- |
| `POST` | `/api/login` | Авторизация по email и паролю, возвращает JWT-токен |

### **Расписание**

| Метод | URL             | Описание                              |
| ----- | --------------- | ------------------------------------- |
| `GET` | `/api/schedule` | Получение расписания (требуется JWT)  |
| `PUT` | `/api/schedule` | Обновление расписания (требуется JWT) |

### **Проверка доступа**

| Метод | URL                 | Описание                         |
| ----- | ------------------- | -------------------------------- |
| `GET` | `/api/check-access` | Проверка доступа без авторизации |

---

## **5. Дополнительная информация**

Перед запуском убедитесь, что **MongoDB запущен**, иначе сервер не сможет работать.

Если используется удаленная база данных, укажите правильный `MONGO_URI` в файле `.env`.

---

# **Frontend Setup Guide**

## **1. Установка и запуск**

Для развертывания клиентской части выполните:

```sh
cd client
npm install
ng serve
```

Приложение будет доступно по адресу: **http://localhost:4200/**

---

## **2. Требования**

- **Node.js** версии `18` или выше
- **Angular CLI** установлен глобально (`npm install -g @angular/cli`)

---

## **3. Конфигурация**

Если сервер работает не на `http://localhost:5004/`, настройте API-адрес в файле `client/src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5004/api',
};
```

---

## **4. Основной функционал**

- **Авторизация** по email и паролю.
- **Редактирование расписания** (временные интервалы для каждого дня).
- **Проверка доступа** на основе установленного расписания.
- **Выход из системы** с очисткой токена.

---

## **5. Возможные ошибки и их решения**

### Проблема: **MongoDB не запущен**

Решение: Убедитесь, что база данных работает. Если используется локальная версия, запустите:

```sh
mongod
```

### Проблема: **Не загружается фронтенд**

Решение: Проверьте, установлен ли `Angular CLI`. При необходимости выполните:

```sh
npm install -g @angular/cli
```

---

### **Проект готов к развертыванию.**
