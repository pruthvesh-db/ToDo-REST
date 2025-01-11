import { Request, Response } from "express";
import Task from "../models/task.model";

// Create a new task
const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dueDate } = req.body;
  const user = req.user as { _id: string };
  
  if (!user || !user._id) {
    res.status(401).json({ message: "Unauthorized" });
    return
  }
  


  try {
    const newTask = new Task({ title, description, dueDate});
    await newTask.save();

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating Task", error });
  }
};

export { createTask };