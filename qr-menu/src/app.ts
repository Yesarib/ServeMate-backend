import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors'
import createError from 'http-errors'
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))


app.get('/check', (req,res) => {
    res.json({msg: "checkk"})
})

app.use('/', routes());
app.get('/servemate/:companyId/:tableId', (req, res) => {
    const companyId = req.params.companyId;
    const tableId = req.params.tableId;

    res.send(`
        <html>
        <head>
            <title>QR Menü</title>
        </head>
        <body>
            <h1>Cafe Bilgileri</h1>
            <p>Şirket ID: ${companyId}</p>
            <p>Masa ID: ${tableId}</p>
            <form action="/order" method="get">
                <input type="hidden" name="companyId" value="${companyId}" />
                <input type="hidden" name="tableId" value="${tableId}" />
                <button type="submit">Sipariş Ver</button>
            </form>
        </body>
        </html>
    `);
});

app.use(async (req, res, next) => {
    next(createError.NotFound());
})

app.use(errorHandler)


export default app;