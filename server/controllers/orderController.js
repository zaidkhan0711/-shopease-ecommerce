const Order = require("../models/Order");
const Cart = require("../models/cart");

exports.placeOrder = async (req, res) => {
    try {

        const cartItems = await Cart.find({ user: req.user.id }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalPrice = 0;

        const products = cartItems.map(item => {
            totalPrice += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity
            };
        });

        const order = await Order.create({
            user: req.user.id,
            products,
            totalPrice
        });

        await Cart.deleteMany({ user: req.user.id });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({ user: req.user.id })
            .populate("products.product");

        res.json({
            success: true,
            orders
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};