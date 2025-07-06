import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import  dotenv  from 'dotenv';
import userRoutes from './routes/user.routes.js';

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());

// Routes 

app.get('/', (req, res) => {
  res.send("API is running")
})

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .then((err) => console.log("Error is", err))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnig on ${PORT}`))


