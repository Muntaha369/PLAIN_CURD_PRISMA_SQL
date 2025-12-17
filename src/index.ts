import 'dotenv/config';
import express, { Request, Response } from 'express';
import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const app = express();
const prisma = new PrismaClient({ adapter })
const PORT = 3000;

console.log("Connecting to:", process.env.DATABASE_URL);

app.use(express.json());

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

app.get('/', async (req: Request, res: Response) => {
  const allUser = await prisma.user.findMany()

  res.json({ msg: "This are all the user", allUser })
});

app.post('/postRoute', async (req: Request, res: Response) => {
  const { name, password, loan } = req.body;

  const user = await prisma.user.create({ data: { name, password, loan } })

  res.json({ msg: "This is the user created", user })
})

checkConnection().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  }))