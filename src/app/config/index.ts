import dotenv from 'dotenv';
import path from 'path';

// Initialize dotenv
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || '5000',
  databaseUrl: process.env.DATABASE_URL as string,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  
  // Firebase Admin Config
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // This handles the newline characters in the private key string
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }
};

// Validations
if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is not defined in .env');
}

if (!config.firebase.projectId || !config.firebase.privateKey || !config.firebase.clientEmail) {
  throw new Error('Firebase configuration is missing in .env (Check Project ID, Client Email, or Private Key)');
}