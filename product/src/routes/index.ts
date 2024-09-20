import express from 'express'
const router = express.Router();
import productRoutes from './product.route'

const routes = () => {
    router.use('/', productRoutes)
    return router
}

export default () => routes;