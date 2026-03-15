import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/Product.js";

import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";

const router = express.Router();

router.get("/", protect, getProducts);

router.get("/:id", protect, getProduct);

router.post("/", protect, authorize("admin"), createProduct);

router.put("/:id", protect, authorize("admin"), updateProduct);

router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;