import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './db-config/dbConnection';
import userRoutes from './routes/user.routes';

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});