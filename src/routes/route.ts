import express from "express";
import * as userController from '../controllers/auth';

export const Authrouter = express.Router();

Authrouter.post('/postRoute', userController.CreateNew)
Authrouter.get('/getAll', userController.getAllUser)

