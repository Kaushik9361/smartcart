import { sequelize } from "../config/db.js";
import UserModel from "./User.js";
import ProductModel from "./Product.js";

export const User = UserModel(sequelize);
export const Product = ProductModel(sequelize);

export const db = {
  sequelize,
  User,
  Product
};