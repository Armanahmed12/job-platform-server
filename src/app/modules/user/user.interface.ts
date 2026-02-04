import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant.js';

export interface IUser {
  _id: string;
  uid: string;
  email: string;
  // password: string;
  // needsPasswordChange: boolean;
  // passwordChangedAt?: Date;
  role: 'candidate' | 'employer' | 'admin';
  status: 'active' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  doesUserExistByUId(is: string): Promise<IUser | null>;
  // doesPasswordMatch(
  //   plainTextPassword: string,
  //   hashedPassword: string
  // ): Promise<boolean>;
  // wasJWTIssuedBeforePasswordChange(
  //   passwordChangedTimestamp: Date,
  //   jwtIssuedTimestamp: number
  // ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
