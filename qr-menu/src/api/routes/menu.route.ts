import express from 'express'
import { validationMiddleware } from '../../middlewares/validation';
import { CreateMenuDto, UpdateMenuDto } from '../../dtos/menu.dto';
import menuController from '../controllers/menu.controller';
const router = express.Router();


router.post('/', validationMiddleware(CreateMenuDto), menuController.createMenu)
router.get('/getCompanyMenu', menuController.getCompanyMenu)
router.get('/:menuId', menuController.getMenuById)
router.put('/:menuId', validationMiddleware(UpdateMenuDto), menuController.updateMenu)
router.patch('/:menuId', menuController.pullMenuCategory)
router.delete('/:menuId', menuController.deleteMenu)

export default router;