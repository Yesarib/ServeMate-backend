import express from 'express'
const router = express.Router();
import orderRoutes from './order.route'

const routes = () => {
    router.use('/',orderRoutes)
    return router
}

export default routes;