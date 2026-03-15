import { User } from "../models/index.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || "user"
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

export const login = async (email, password) => {

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};