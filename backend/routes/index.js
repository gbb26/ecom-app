const express = require("express");
const { validateUserData, validateLoginData } = require("../middlewares/auth");
const { signUpUser, loginUser, logOutUser } = require("../controllers/auth");
const { authToken } = require("../helpers/jwt-token");
const { getProductsList, getProductDetailsByCode } = require("../controllers/products");
const { addToCart, getCartItems, updateCartItem, deleteCartItem } = require("../controllers/cart");
const { createOrder, successOrder } = require("../controllers/payout");

const router = express.Router();

// auth
router.post("/auth/register", validateUserData, signUpUser);
router.patch("/auth/login", validateLoginData, loginUser);
router.use(authToken);
router.patch("/auth/logout", logOutUser);

// products
router.get("/products", getProductsList);
router.get("/products/:productID", getProductDetailsByCode);

// cart
router.post("/cart", addToCart);
router.get("/cart", getCartItems);
router.patch("/cart", updateCartItem);
router.delete("/cart", deleteCartItem);

// payout
router.post("/payout", createOrder);
router.post("/payout/success", successOrder);

module.exports = router;