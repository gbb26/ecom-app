const Razorpay = require("razorpay");
const dotenv = require('dotenv');
dotenv.config();

const createOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: amount, // amount in smallest currency unit
            currency: currency,
            receipt: "Cart_Order",
        };
        const order = await instance.orders.create(options);
        console.log(order);
        if (!order) return res.status(500).json("Some error occured");
        res.json(order);
    } catch (error) {
        res.status(500).json(error);
    }
};
const successOrder = async (req, res) => {
    try {
        // getting the details back from our front-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = { createOrder, successOrder };