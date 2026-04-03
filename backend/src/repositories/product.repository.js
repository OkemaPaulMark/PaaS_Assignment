import prisma from "../prisma/client.js";

export const findAllProducts = () =>
  prisma.product.findMany({ orderBy: { createdAt: "desc" } });

export const findProductById = (id) =>
  prisma.product.findUnique({ where: { id } });

export const createProduct = (data) => prisma.product.create({ data });

export const updateProduct = (id, data) =>
  prisma.product.update({ where: { id }, data });

export const deleteProduct = (id) =>
  prisma.product.delete({ where: { id } });
