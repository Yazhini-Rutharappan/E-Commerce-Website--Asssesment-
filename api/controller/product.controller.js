import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const image = req.file ? `/upload/${req.file.filename}` : null;

  if (!image) {
    return next(errorHandler(400, "Image is required"));
  }

  const newProduct = new Product({
    ...req.body,
    slug,
    image,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

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
