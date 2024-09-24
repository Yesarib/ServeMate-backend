import express from 'express'
import { validationMiddleware } from '../../middlewares/validation';
import qrCodeController from '../controllers/qr.controller';
import { CreateQRDto } from '../../dtos/qr.dto';
const router = express.Router();

router.post('/', validationMiddleware(CreateQRDto), qrCodeController.createQrCode);
router.get('/', qrCodeController.readQrCode);

export default router;