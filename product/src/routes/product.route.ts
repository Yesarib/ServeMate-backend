import express from 'express'
import { validationMiddleware } from '../middlewares/validation';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import productController from '../controller/product.controller';
const router = express.Router();


router.post('/', validationMiddleware(CreateProductDto), productController.createProduct);
router.get('/getCompanyProducts',productController.getCompanyProducts)
router.get('/:productId', productController.getProductById)
router.put('/:productId', validationMiddleware(UpdateProductDto), productController.updateProduct)
router.delete('/:productId', productController.deleteProduct)

export default router;