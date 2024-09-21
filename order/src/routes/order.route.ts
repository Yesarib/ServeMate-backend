import express from 'express'
import { validationMiddleware } from '../middlewares/validation';
import { CreateOrderDto } from '../dtos/order.dto';
import orderController from '../controllers/order.controller';
const router = express.Router();

router.post('/', validationMiddleware(CreateOrderDto), orderController.newOrder)
router.post('/completeOrder/:orderId',  orderController.completeOrder)
router.patch('/newItems/:orderId',  orderController.newItemsToOrder)
router.patch('/removeItem/:orderId', orderController.removeItemFromOrder)
router.patch('/confirmNewOrder/:orderId', orderController.confirmNewOrder)
router.patch('/updateQuantity', orderController.updateQuantity)
router.delete('/:orderId', orderController.deleteOrder)
router.get('/:orderId', orderController.getOrderById)

export default router;