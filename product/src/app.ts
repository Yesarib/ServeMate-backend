import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors'
import createError from 'http-errors'
import errorHandler from './middlewares/errorHandler';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { resolvers, typeDefs } from './graphql/schema';
import productRoutes from './api/routes/product.route'

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({ 
        typeDefs: typeDefs, 
        resolvers: resolvers,
    });

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan('dev'))

    await server.start();

    app.get('/check', (req, res) => {
        res.json({ msg: "checkk" })
    })

    app.use('/graphql', expressMiddleware(server))
    app.use('/', productRoutes);

    app.use(async (req, res, next) => {
        next(createError.NotFound());
    })

    app.use(errorHandler)
    const PORT: string = process.env.PORT || "5000";

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    })
}

export default startServer;