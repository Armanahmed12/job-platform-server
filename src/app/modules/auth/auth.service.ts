import crypto from "crypto";
import AppError from '../../errors/AppError.js';
import { User } from '../user/user.model.js';
import httpStatus from 'http-status';
import { createToken } from './auth.utils.js';
import { config } from '../../config/index.js';
import { createRefreshToken, findValidRefreshToken, revokeRefreshToken } from '../refreshToken/refreshToken.service.js';


// 1. ------------------ loginUser
const loginUser = async (firebaseUser: {
  uid: string;
  email?: string;
}) => {
  // 1️⃣ Find or create user
  let user = await User.findOne({ uid: firebaseUser.uid });

  if (!user) {
    user = await User.create({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role: "candidate",
      status: "active",
    });
  }

  // 2️⃣ Security checks
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  // 3️⃣ Create JWT access token
  const payload = {
    uid: user.uid,
    email : user.email
  };

  const accessToken = createToken(
    payload,
    config.jwt_access_secret!,
    config.jwt_access_expires_in!
  );

  // 4️⃣ Create RANDOM refresh token (NOT JWT)
  const refreshToken = crypto
    .randomBytes(64)
    .toString("hex");

  // 5️⃣ Store refresh token HASH in DB
  await createRefreshToken({
    userId: user._id, // ✅ DB ID, not Firebase UID
    refreshToken,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    ),
  });

  // 6️⃣ Return tokens
  return {
    accessToken,
    refreshToken,
  };
};

// 2. ------------ get new accessToken through refreshToken
 const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "No refresh token provided");
  }

  // 1️⃣ Validate refresh token in DB
  const storedToken = await findValidRefreshToken(refreshToken);
  if (!storedToken) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid or expired refresh token");
  }

  // 2️⃣ Find the user
  const user = await User.findById(storedToken.userId);
  if (!user || user.isDeleted || user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is not allowed");
  }

  // 3️⃣ Create new access token
  const payload = {
    uid: user.uid,
    email : user.email,
  };

  const accessToken = createToken(
    payload,
    config.jwt_access_secret!,
    config.jwt_access_expires_in!
  );

  // 4️⃣ Return access token (controller will send response)
  return accessToken;
};

// 3. ------------------ logoutUser
const logoutUser = async (refreshToken: string) => {
  // Revoke token in DB
  await revokeRefreshToken(refreshToken);
};

export const AuthServices = {
  loginUser,
  refreshAccessToken,
  logoutUser
};
