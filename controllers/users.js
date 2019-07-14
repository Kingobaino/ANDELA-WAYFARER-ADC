import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { 
 create,
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
    
  }
    
export default users;