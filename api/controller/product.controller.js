import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

// Create product with image upload
export const create = async (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  // Ensure the image is correctly uploaded and the path is saved
  const image = req.file ? `/upload/${req.file.filename}` : null;

  if (!image) {
    return next(errorHandler(400, 'Image is required'));
  }

  const newProduct = new Product({
    ...req.body,
    slug,
    image, // Save the image path to the product
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Get all products or get by slug if query exists
export const getproducts = async (req, res, next) => {
  try {
    let products;
    if (req.query.slug) {
      products = await Product.find({ slug: req.query.slug });
    } else {
      products = await Product.find();
    }
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};
