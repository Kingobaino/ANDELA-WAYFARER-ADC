import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

const verifyJwt = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({ error: "Token not provided" });
    }
    const token = bearerToken.split(" ")[1];
    const verifiedUser = jwt.verify(token, SECRET);
    if (!verifiedUser) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication error" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const { newUser } = req.user;
    if (!newUser.is_admin) {
      return res.status(403).json({ error: "User not authorized" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { verifyJwt, verifyAdmin };
