import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound.js';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import router from './app/routes/index.js';

const app: Application = express();

// ----------------------------
// ✅ 1. CORS middleware (must come FIRST)
// ----------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-platform-44760.web.app",
];

// middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));

// ----------------------------
// ✅ 3. Cookie parser (after CORS)
// ----------------------------
app.use(cookieParser());

// ----------------------------
// ✅ 4. Body parser
// ----------------------------
app.use(express.json());

// ----------------------------
// ✅ 5. Test route
// ----------------------------
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

// ----------------------------
// ✅ 6. API routes
// ----------------------------
app.use('/api/v1', router);

// ----------------------------
// ✅ 7. 404 + global error handler
// ----------------------------
app.use(notFound);
app.use(globalErrorHandler);

export default app;
