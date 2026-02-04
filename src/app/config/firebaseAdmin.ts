import admin from 'firebase-admin';
import { config } from './index.js';


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      privateKey: config.firebase.privateKey,
    } as admin.ServiceAccount),
  });
}

export default admin;