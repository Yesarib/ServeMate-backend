import dotenv from 'dotenv'
dotenv.config();
import './config/mongo'
import startServer from './app';


startServer();