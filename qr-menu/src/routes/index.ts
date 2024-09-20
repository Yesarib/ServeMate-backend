import express from 'express'
const router = express.Router();
import qrCodeRoutes from './qr.route'
import categoryRoutes from './category.route'
import menuRoutes from './menu.route'

const routes = () => {
    router.use('/qr', qrCodeRoutes)
    router.use('/category', categoryRoutes)
    router.use('/menu', menuRoutes)
    return router
}

export default routes;