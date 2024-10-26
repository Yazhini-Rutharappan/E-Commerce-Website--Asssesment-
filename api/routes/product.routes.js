import express from 'express';
import { create, getproducts } from '../controller/product.controller.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/create', upload.single('image'), create);

router.get('/getproducts', getproducts);

export default router;
