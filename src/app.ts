import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './db-config/dbConnection';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import isAuthenticate from './middlewares/auth.middleware';
import taskCompleted from './cron/task.cron';

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', isAuthenticate, taskRoutes);

connectDB();
taskCompleted();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});