const Cart = require("../models/cart");

// Add to Cart
exports.addToCart = async (req, res) => {
    try {

        const { product, quantity } = req.body;

        const cartItem = await Cart.create({
            user: req.user.id,
            product,
            quantity
        });

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cartItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get User Cart
exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.find({ user: req.user.id })
            .populate("product");

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Remove Cart Item
exports.removeCartItem = async (req, res) => {
    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};