const Cart = require('../models/cart');
const addToCart = async (req, res) => {
    try {
        const { userID, productID, quantity, totalPrice } = req.body;

        // Check if the user already has a cart
        let cart = await Cart.findOne({ userID });

        if (!cart) {
            // If the user does not have a cart, create a new one
            cart = new Cart({
                userID,
                cartItems: []
            });
        }

        // Add the new item to the cart
        cart.cartItems.push({ productID, quantity, totalPrice });
        // Save the updated cart to the database
        await cart.save();

        res.status(201).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getCartItems = async (req, res) => {
    try {
        const { userID } = req?.body;
        const cart = await Cart.findOne({ userID: userID }, {})
        return res.status(201).json({ cart: cart })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { userID, productID, quantity, totalPrice } = req.body;
        // Find and update the cart item
        const result = await Cart.findOneAndUpdate(
            { userID, 'cartItems.productID': productID },
            { $set: { 'cartItems.$.quantity': quantity, 'cartItems.$.totalPrice': totalPrice } }, // Update the quantity and total price
            { new: true } // Return the updated document
        );

        if (!result) {
            return res.status(404).json({ error: 'Cart item not found or user not found' });
        }
        res.json({ message: 'Cart item updated successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteCartItem = async (req, res) => {
    try {
        const { productID } = req.query;
        const { userID } = req.body;

        // Find and update the cart to remove the specified cart item
        const result = await Cart.findOneAndUpdate(
            { userID },
            { $pull: { cartItems: { productID } } }, // Remove the cart item with the specified productID
            { new: true } // Return the updated document
        );

        if (!result) {
            return res.status(404).json({ error: 'Cart item not found or user not found' });
        }

        res.json({ message: 'Cart item deleted successfully', cart: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { addToCart, getCartItems, updateCartItem, deleteCartItem };