import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import createError from 'http-errors'
import errorHandler from './middlewares/errorHandler';
import { initializeSocket } from './config/socketio';
import { start } from './consumers/order.consumer';

const startApp = async () => {
    const app = express();
    const server = http.createServer(app);
    initializeSocket(server);

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan('dev'))


    app.get('/check', (req, res) => {
        res.json({ msg: "checkk" })
    })

    app.use(async (req, res, next) => {
        next(createError.NotFound());
    })

    app.use(errorHandler)

    await start();
    const PORT: string = process.env.PORT || "5000";
    server.listen(PORT, () => {
        console.log(`Web socket running on ${PORT}`);
    })

    return app;
}

export default startApp;