import * as productRepository from "../repositories/product.repository.js";

export const getAllProducts = () => productRepository.findAllProducts();

export const getProductById = async (id) => {
  const product = await productRepository.findProductById(id);
  if (!product) throw { status: 404, message: "Product not found" };
  return product;
};

export const createProduct = (data) => productRepository.createProduct(data);

export const updateProduct = async (id, data) => {
  await getProductById(id);
  return productRepository.updateProduct(id, data);
};

export const deleteProduct = async (id) => {
  await getProductById(id);
  return productRepository.deleteProduct(id);
};
