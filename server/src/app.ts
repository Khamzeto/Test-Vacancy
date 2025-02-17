import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { loggerMiddleware } from './middlewares/logger.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use('/api', router);

export default app;
