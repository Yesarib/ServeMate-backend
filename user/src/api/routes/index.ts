import express from 'express'
const router = express.Router();
import userRoutes from './user.route'

const routes = () => {
    router.use('/', userRoutes)

    return router
}

export default routes;