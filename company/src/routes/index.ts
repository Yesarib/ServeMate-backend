import express from 'express'
const router = express.Router();
import companyRoutes from './company.route'
import tableRoutes from './table.route'

const routes = () => {
    router.use('/company', companyRoutes)
    router.use('/table', tableRoutes)

    return router
}

export default routes;