import { RefreshToken } from "./refreshToken.model.js";
import { hashRefreshToken } from "./refreshToken.utils.js";


//------------- Create & store refresh token
type TTokenType = {
  userId : string,
  refreshToken : string,
  expiresAt : Date,
};

export const createRefreshToken = async ( tokenInfo: TTokenType) => {
const {userId,expiresAt,refreshToken} = tokenInfo;
const tokenHash = hashRefreshToken(refreshToken);
  return RefreshToken.create({
    userId,
    tokenHash,
    expiresAt,
  });
};

//------------ Find a valid (not revoked, not expired) refresh token

export const findValidRefreshToken = async (refreshToken : string) => {
  const tokenHash = hashRefreshToken(refreshToken);
  return RefreshToken.findOne({
    tokenHash,
    isRevoked: false,
    expiresAt: { $gt: new Date() },
  });
};

//-----------Soft delete (revoke) a refresh token
export const revokeRefreshToken = async (refreshToken : string) => {
  const tokenHash = hashRefreshToken(refreshToken);

  return RefreshToken.findOneAndUpdate(
    { tokenHash },
    { isRevoked: true }
  );
};

//------------- Revoke all refresh tokens for a user
export const revokeAllRefreshTokens = async (userId : string) => {
  return RefreshToken.updateMany(
    { userId },
    { isRevoked: true }
  );
};
