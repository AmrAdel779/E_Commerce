import { Cart } from "../../../DB/models/Cart.model.js"
import { Order } from "../../../DB/models/order.model.js"
import { Product } from "../../../DB/models/product.model.js"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import { Stripe } from "stripe"
const stripe = new Stripe('sk_test_51Q2FAwHUoDGvuisU3Xl1ylvoAR8EnHRyeb8zxwXjyyBSzT6gHRSgzU2kxIQkfzOtB2Opc9mkSLYWpdQ2wvN7LOKf00TaIkk9h9');
const createCashOrder = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))
    let order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalPrice: cart.totalCartPriceAfterDiscount || cart.totalCartPriceNumber,
        shippingAddresses: req.body

    })
    await order.save()
    let options = cart.cartItems.map((prod) => {

        return (
            {
                updateOne: {
                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
                }
            }
        )
    })
    await Product.bulkWrite(options)
    await Cart.findByIdAndDelete(req.params.id)
    res.json({ message: "success", order })

})
const createCheckOutSession = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 501))
    let totalPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPriceNumber
    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: "https://www.google.com",
        cancel_url: "https://www.google.com",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress

    })
    res.json({ message: "success", session })

})

const getAllOrders = catchError(async (req, res, next) => {


    if (req.params.user) {
        let order = await Order.findOne({ user: req.params.user })
        if (!order) return next(new AppError('No orders yet', 501))
        res.json({ message: "success", order })
    } else {
        let orders = await Order.find()
        if (!orders) return next(new AppError('No orders yet', 501))
        res.json({ message: "success", orders })
    }



})

export {
    createCashOrder,
    getAllOrders,
    createCheckOutSession
}
