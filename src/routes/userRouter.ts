import express, {Router, Request, Response, NextFunction} from 'express';
import userController from '../controllers/userController';
 const router: Router = express.Router();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)

router.get('/', userController.getAll)

router.get('/:id', userController.getOne)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

export default router;