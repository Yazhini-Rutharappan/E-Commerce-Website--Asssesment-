import express from 'express';
import { create, getproducts } from '../controller/product.controller.js';
import upload from '../middleware/uploadMiddleware.js'; // Middleware for image upload

const router = express.Router();

// Create product with image upload
router.post('/create', upload.single('image'), create);

// Get products
router.get('/getproducts', getproducts);

export default router;
