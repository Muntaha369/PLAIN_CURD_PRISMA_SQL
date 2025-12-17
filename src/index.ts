import 'dotenv/config';
import express from 'express';
import { checkConnection } from './controllers/auth';
import { Authrouter } from './routes/route';

const app = express();
const PORT = 3000;

console.log("Connecting to:", process.env.DATABASE_URL);

app.use(express.json());
app.use('/api/auth',Authrouter)

checkConnection().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }))