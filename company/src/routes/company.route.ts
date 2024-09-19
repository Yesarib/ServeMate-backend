import express from 'express'
import companyController from '../controllers/company.controller';
import { validationMiddleware } from '../middlewares/validation';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/company.dto';
const router = express.Router();


router.post('/', validationMiddleware(CreateCompanyDto), companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:companyId', companyController.getCompanyById);
router.put('/:companyId', validationMiddleware(UpdateCompanyDto), companyController.updateCompany);
router.delete('/:companyId', companyController.deleteCompany);

export default router;