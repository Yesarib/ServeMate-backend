import express from 'express'
import { validationMiddleware } from '../../middlewares/validation';
import { CreateTableDto, PatchTableDto, UpdateTableDto } from '../../dtos/table.dto';
import tableController from '../controllers/table.controller';
const router = express.Router();

router.post('/', validationMiddleware(CreateTableDto), tableController.createTable)
router.get('/getCompanyTables', tableController.getCompanyTables)
router.get('/:tableId', tableController.getTableById)
router.put('/:tableId', validationMiddleware(UpdateTableDto), tableController.updateTable)
router.patch('/:tableId', validationMiddleware(PatchTableDto), tableController.changeTableStatus)

export default router;