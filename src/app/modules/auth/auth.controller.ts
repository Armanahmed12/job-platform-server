import { config } from '../../config/index.js';
import catchAsync from '../../utils/catchAsync.js';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service.js';

const loginUser = catchAsync(async (req, res) => {
  // 1️⃣ Call service to get tokens
  const { accessToken, refreshToken } = await AuthServices.loginUser(req.user);

  // 2️⃣ Set HttpOnly refresh token cookie
 res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,          // ALWAYS true on Vercel
  sameSite: 'none',      // REQUIRED for cross-site
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


  // 3️⃣ Return access token in response body
  res.status(200).json({
    success: true,
    accessToken,
  });
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  const accessToken = await AuthServices.refreshAccessToken(refreshToken);

  res.status(200).json({
    success: true,
    accessToken,
  });
});

const logoutUser = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await AuthServices.logoutUser(refreshToken);
  }

  // Clear cookie no matter what
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Logged out successfully",
  });
});


export const AuthControllers = {
  loginUser,
  refreshAccessToken,
  logoutUser
};
