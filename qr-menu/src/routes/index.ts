import express from 'express'
const router = express.Router();
import qrCodeRoutes from './qr.route'

const routes = () => {
    router.use('/qr', qrCodeRoutes)
    return router
}

export default routes;