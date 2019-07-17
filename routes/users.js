import express from 'express';
import users from '../controllers/users';
 import{ 
 verifyJwt, 
 verifyAdmin}
 from '../middlewares/authentic';

const router = express.Router();

router.post('/auth/signup', users.create);
router.post('/auth/signin', users.signin);
router.post('/trips', verifyJwt, verifyAdmin, users.createTrip);
router.get('/trips', verifyJwt, users.view);
router.post('/bookings', verifyJwt, users.booking);

export default router;