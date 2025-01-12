import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './db-config/dbConnection';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import isAuthenticate from './middlewares/auth.middleware';
import taskCompletedCron from './cron/task.cron';



const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', isAuthenticate, taskRoutes);

const startServer = async () => {
  try {
    await connectDB(); // Connect to the database
    taskCompletedCron(); // Start the cron job

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); 
  }
};

startServer();