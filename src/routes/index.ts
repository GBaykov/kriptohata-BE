import express, {Router} from 'express';
import deviceRouter from './deviceRouter';
import userRouter from './userRouter';
import typeRouter from './typeRouter'

 const router: Router = Router();

router.use('/user', userRouter)
router.use('/device',deviceRouter)
router.use('/type',typeRouter)

export default router;