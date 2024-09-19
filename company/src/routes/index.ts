import express from 'express'
const router = express.Router();
import companyRoutes from './company.route'

const routes = () => {
    router.use('/company', companyRoutes)

    return router
}

export default routes;