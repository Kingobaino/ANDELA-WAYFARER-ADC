import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { 
 create,
 findOne,
 matchOne
}
from '../models/users';

dotenv.config();

const users = {
  async create(req, res) {
    try {
      const user = await matchOne(req.body.email);
        if (user) {
          return res.status(409).json({ error: 'Email already exists' });
        }
        const hash = await bcrypt.hash(req.body.password, 8)
        const newUser = await create({ ...req.body, password: hash });
        delete newUser.password;
        const token = jwt.sign({ newUser }, process.env.SECRET, { expiresIn: '24h' });
        return res.status(201).json({ status: 'success', data: { ...newUser, token } });
      } catch(error) {
          console.log(error);
          return res.status(500).json(error);
      }
  },
    
    async signin (req, res) {
      try {
        const user = await findOne(req.body.email);
        if (!user) {
          return res.status(404).json({ error: 'User does not exists.' });
       }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
         if (!validPassword){
          return res.status(400).json({error: 'Incorrect Signin details.'});
       };
        delete user.password;
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
      return res.status(200).json({ status: 'success', data: { ...user, token }});
     } catch(error) {
        return res.status(500).json(error);
      }
    }
  }
    
export default users;