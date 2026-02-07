import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound.js';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import router from './app/routes/index.js';
import cookieParser from 'cookie-parser';
const app: Application = express();

// middleware

// ✅ Use cookie-parser middleware
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://job-platform-44760.web.app",
      "https://job-platform-44760.firebaseapp.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// VERY IMPORTANT
app.options("*", cors());


app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

// student routes 👇
app.use('/api/v1', router);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
