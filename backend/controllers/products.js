const Product = require("../models/products");

const getProductsList = async (req, res) => {
    try {
        const category = req?.query?.category || "women's clothing";
        const rating = req?.query?.rating || 0;
        if (!category) {
            return res.status(400).json({ message: "No category found!!!" })
        }
        const results = await Product.find({
            category: category,
            "rating.rate": { $gte: rating }
        },
            {
                _id: 1,
                prodName: 1,
                prodImage: 1,
                price: 1,
                discount: 1,
                inStock: 1,
                rating: 1
            }
        )
        if (results.length < 1) {
            return res.status(204).json({ message: "No items available for this category..." })
        }
        return res.status(201).json({ message: "Items fetched successfully!", totalItems: results.length, data: results })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
const getProductDetailsByCode = async (req, res) => {
    try {
        const { productID } = req?.params;
        if (!productID) {
            return res.status(400).json({ message: "No category found!!!" })
        }
        const results = await Product.findOne({
            _id: productID
        },
            {}
        )
        if (!results) {
            return res.status(204).json({ message: "This item does not exists" })
        }
        return res.status(201).json({ message: "Item fetched successfully!", data: results })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
module.exports = { getProductsList, getProductDetailsByCode };