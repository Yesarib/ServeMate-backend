import express from 'express'
import userController from '../controllers/user.controller';
const router = express.Router();


router.post('/', userController.createUser);
router.get('/getByEmail', userController.getUserByEmail);

router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;