import express from 'express';
import router from './routes/userRoute.js';
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser'
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((err, req, res, next) => {

   if (err instanceof multer.MulterError) {
      return res.status(400).json({
         message: err.message
      })
   }

   next(err)
})
app.use('/api', router);
