import express from 'express';
import connectDB from './config/database.config.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || '8000';
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017';
connectDB(DATABASE_URL);
app.use(express.json());
app.use('/api', userRoutes);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const corsOptions = {
  origin: "http://localhost:19006",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
