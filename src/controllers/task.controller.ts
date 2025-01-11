import { Request, Response } from "express";
import Task from "../models/task.model";

interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

// Create a new task
const createTask = async (req: CustomRequest, res: Response): Promise<void> => {
  const { title, description, dueDate } = req.body;

  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const newTask = new Task({ title, description, dueDate, user: req.user._id });
    await newTask.save();

    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating Task", error });
  }
};

// Read all tasks for the authenticated user
const readTasks = async (req: CustomRequest, res: Response): Promise<void> => {
  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update a task by ID
const updateTask = async (req: CustomRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, dueDate, completed },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task by ID
const deleteTask = async (req: CustomRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export { createTask, readTasks, updateTask, deleteTask };
