import express, {Router, Request, Response, NextFunction} from 'express';
 const router: Router = express.Router();

router.post('/registration')
router.post('/login')
router.get('/auth')

router.get('/', (async (req:Request, res:Response, next:NextFunction) => {
    try {
    //   const users = await usersRepo.getAll();
    //   if (!users) throw new Error("NOO users")
      res.status(202).json('GOOOOD');
      // 
    } catch(err) {
      next(err)
    }
  }))

router.get('/:id')
router.put('/:id')
router.delete('/:id')

export default router;