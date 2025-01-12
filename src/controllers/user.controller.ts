import { Request, Response } from "express";
import user from "../models/user.model";

const signup = async (req: Request, res: Response): Promise<any>  => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await user.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const newUser = new user({ email, password });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Login Function
  const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
  
    try {
      const users = await user.findOne({ email });
      if (!users) return res.status(404).json({ message: "User not found" });
  
      const isPasswordValid = await users.comparePassword(password);
      if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = users.generateAuthToken();
      res.status(200).json({ message: "Login Succesful", token });
      
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

export { signup, login };