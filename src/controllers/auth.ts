import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';
import { Request, Response } from 'express';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter })


export const CreateNew = async (req: Request, res: Response) => {
  const { name, password, loan } = req.body;

  const user = await prisma.user.create({ data: { name, password, loan } })

  res.json({ msg: "This is the user created", user })
}

export const getAllUser = async(req: Request, res: Response)=>{
  const allUser = await prisma.user.findMany()

  res.json({ msg: "This are all the user", allUser })
}

export const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
