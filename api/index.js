import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import useRoute from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/e-commerce')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.log(err);
  });

app.use('/upload', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'your-session-secret',
  resave: false,  
  saveUninitialized: true,  
  cookie: { secure: false } 
}))

app.use('/api/user', useRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
