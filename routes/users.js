import express from 'express';
import users from '../controllers/users';
const router = express.Router();

router.post('/auth/signup', users.create);



export default router;