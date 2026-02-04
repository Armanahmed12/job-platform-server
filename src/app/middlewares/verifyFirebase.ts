import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin.js';

export const verifyFirebase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    (req as any).user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid Firebase token' });
  }
};
