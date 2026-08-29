const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addToCart,
    getCart,
    removeCartItem
} = require("../controllers/cartController");

router.post("/", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.delete("/:id", authMiddleware, removeCartItem);

module.exports = router;