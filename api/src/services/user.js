import { User } from "../models/index.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
return await User.create(data);
};
export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }
    
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  };
};