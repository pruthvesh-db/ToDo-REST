import cron from 'node-cron';
import Task from '../models/task.model';
import dotenv from 'dotenv';

dotenv.config();

// Task Cron Job
const taskCompletedCron = async () => {
    try {
      console.log("CRON Job: Checking for expired tasks...");
      const now = new Date();
  
      const updatedTasks = await Task.updateMany(
        { dueDate: { $lt: now }, completed: false }, // Find tasks with expired due dates that are not completed
        { $set: { completed: true } } // Mark them as completed
      );
  
      console.log(`CRON Job: Updated ${updatedTasks.modifiedCount} expired tasks as completed.`);
    } catch (error) {
      console.error("Error in CRON job:", error);
    }
  };

// Run the cron job \
const cronTimer = process.env.CRON_TIMER || "0 0 * * *"; // Default: Run every day at midnight

cron.schedule(cronTimer, async () => {
    await taskCompletedCron();
    console.log("CRON Job executed successfully.");
  });
  
export default taskCompletedCron;