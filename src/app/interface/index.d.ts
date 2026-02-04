import { JwtPayload } from 'jsonwebtoken';

export interface MyJwtPayload extends JwtPayload {
  uid: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: MyJwtPayload;
    }
  }
}
