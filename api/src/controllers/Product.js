import * as productService from "../services/product.js";

export const getProducts = async (req, res, next) => {
  try {

    const products = await productService.getAllProducts();

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {

    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {

    const product = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {

    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {

    await productService.deleteProduct(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};