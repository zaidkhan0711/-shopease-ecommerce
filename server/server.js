const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ================= Protected Route =================
app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to your profile!",
        user: req.user
    });
});

// ================= Home Route =================
app.get("/", (req, res) => {
    res.send("🚀 E-Commerce Backend API Running...");
});

// ================= MongoDB =================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

// ================= Start Server =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});