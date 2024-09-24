import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors'
import createError from 'http-errors'
import errorHandler from './middlewares/errorHandler';
import authRoutes from './api/routes/auth.route'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))


app.get('/check', (req,res) => {
    res.json({msg: "checkk"})
})

app.use('/', authRoutes);

app.use(async (req, res, next) => {
    next(createError.NotFound());
})

app.use(errorHandler)


export default app;