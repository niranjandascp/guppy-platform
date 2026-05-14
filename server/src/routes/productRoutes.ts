import express from "express";
import {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.ts";

const router = express.Router();

router.route("/").post(createProduct).get(getProducts);
router.route("/:slug").get(getProductBySlug);
router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;