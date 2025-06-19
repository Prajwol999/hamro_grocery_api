import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../controllers/productController.js";
import upload from "../../middleware/fileUpload.js";

const router = express.Router();

router.post("/", upload.array("image", 10), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.array("image", 10), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
