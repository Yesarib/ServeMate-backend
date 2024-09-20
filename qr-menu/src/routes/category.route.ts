import express from 'express'
import { validationMiddleware } from '../middlewares/validation';
import { CreateCategoryDto } from '../dtos/category.dto';
import categoryController from '../controllers/category.controller';
const router = express.Router();

router.post('/', validationMiddleware(CreateCategoryDto), categoryController.createCategory);
router.get('/getCompanyCategories', categoryController.getCompanyCategories);
router.get('/:categoryId', categoryController.getCategoryById)
router.put('/:categoryId', categoryController.updateCategory)
router.delete('/:categoryId', categoryController.deleteCategory)
 
export default router;