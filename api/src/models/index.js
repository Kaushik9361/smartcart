import { sequelize } from "../config/db.js";
import UserModel from "../models/User.js";


export const User = UserModel(sequelize);


export const db = {
sequelize,
User
};