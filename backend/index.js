import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('✅ Personal Task Tracker API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
