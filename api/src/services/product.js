import { Product } from "../models/index.js";

export const getAllProducts = async () => {
  return await Product.findAll();
};

export const getProductById = async (id) => {
  return await Product.findByPk(id);
};

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const updateProduct = async (id, data) => {

  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.update(data);

  return product;
};

export const deleteProduct = async (id) => {

  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.destroy();

  return true;
};