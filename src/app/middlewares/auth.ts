import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../errors/AppError.js';
import { User } from '../modules/user/user.model.js';
import { config } from '../config/index.js';

interface AuthPayload extends JwtPayload {
  uid: string;
  email?: string;
}

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1️⃣ Get token from header
      const authHeader = req?.headers?.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Authorization token missing'
        );
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // 2️⃣ Verify token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret!
      ) as AuthPayload;
      // 3️⃣ Load fresh user from DB
      const user = await User.findOne({ uid: decoded.uid });

      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
      }

      if (user.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
      }

      if (user.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
      }

      // 4️⃣ Attach user to request
      req.user = user;

      next();
    } catch (error) {
      
      if (error instanceof jwt.TokenExpiredError) {
        const expiredToken =new AppError(
            httpStatus.UNAUTHORIZED,
            'Access token expired',
            'TOKEN_EXPIRED'
          );
         return next(expiredToken);
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return next(
          new AppError(
            httpStatus.UNAUTHORIZED,
            'Invalid access token',
            'TOKEN_INVALID'
          )
        );
      }
      return next(error);
    }
  };
};

export default auth;
