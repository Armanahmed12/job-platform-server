import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface.js';
import bcrypt from 'bcrypt';
import { config } from '../../config/index.js';

const userSchema = new Schema<IUser>(
  {
    uid: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    // password: { type: String, required: true, select: 0 },
    // needsPasswordChange: { type: Boolean, default: true },
    // passwordChangedAt: { type: Date },
    role: {
      type: String,
      enum: ['candidate', 'employer', 'admin'],
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,

    statics: {
      async doesUserExistByUId(uid: string) {
        return await this.findOne({ uid });
      },
      // async doesPasswordMatch(
      //   plainTextPassword: string,
      //   hashedPassword: string
      // ) {
      //   return await bcrypt.compare(plainTextPassword, hashedPassword);
      // },
      // async wasJWTIssuedBeforePasswordChange(
      //   passwordChangedTimestamp: Date,
      //   jwtIssuedTimestamp: number
      // ) {
      //   const passwordChangedTime =
      //     new Date(passwordChangedTimestamp).getTime() / 1000;

      //   return passwordChangedTime > jwtIssuedTimestamp;
      // },
    },
  }
);

// // pre save middleware
// userSchema.pre('save', async function (next) {
//   const user = this as IUser;

//   // Only hash the password if it’s new or modified
//   // if (!user.isModified("password")) return next();

//   try {
//     user.password = await bcrypt.hash(
//       user.password,
//       Number(config.bcrypt_salt_rounds)
//     );
//     next();
//   } catch (err) {
//     next(err as Error);
//   }
// });

//********** / post save middleware
// userSchema.post('save', async function (doc, next) {
//   doc.password = ''; // hide hashed password
//   next();
// });

export const User = model<IUser, UserModel>('User', userSchema);
