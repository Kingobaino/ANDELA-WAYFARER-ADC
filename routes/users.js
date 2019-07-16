import express from 'express';
import users from '../controllers/users';
 import{ 
 verifyJwt, 
 verifyAdmin}
 from '../middlewares/authentic';

const router = express.Router();

router.post('/auth/signup', users.create);
router.post('/auth/signin', users.signin);
router.post('/trip', verifyJwt, verifyAdmin, users.createTrip);



export default router;