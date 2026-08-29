const express = require("express");
const router = express.Router();

const {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected Route
router.post("/", authMiddleware, addProduct);

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected Routes
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;