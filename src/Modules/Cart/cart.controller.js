import { Cart } from "../../../DB/models/Cart.model.js"
import { Coupon } from "../../../DB/models/coupon.model.js"
import { Product } from "../../../DB/models/product.model.js"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"

function calcTotalPrice(cart, productPrice) {

    let totalCartPriceNumber = 0

    cart.cartItems.forEach(item => {
        let total = productPrice * item.quantity
        totalCartPriceNumber += total
        cart.totalCartPriceNumber = totalCartPriceNumber

        if (cart.discount) {
            cart.totalCartPriceNumber = cart.totalCartPriceNumber - (cart.totalCartPriceNumber * cart.discount) / 100

        }
    }
    )
}
const addToCart = catchError(async (req, res, next) => {
    let isCartExist = await Cart.findOne({ user: req.user._id })
    let product = await Product.findById(req.body.product)
    if (!isCartExist) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [req.body],
            price: product.price
        })

        if (cart.cartItems[0].quantity > product.stock) return next(new AppError('soldOut', 501))
        calcTotalPrice(cart, product.price)
        await cart.save()
        res.json({ message: "Success", cart })
    } else {
        let item = isCartExist.cartItems.find(item => item.product == req.body.product)
        if (item) {

            item.quantity += req.body.quantity || 1
            if (item.quantity > product.stock) return next(new AppError('soldOut', 501))
            await isCartExist.save()
            res.json({ message: "success", cart: isCartExist })


        }
        if (!item) isCartExist.cartItems.push(req.body)
        calcTotalPrice(isCartExist, product.price)
        await isCartExist.save()

        res.json({ message: "success", cart: isCartExist })
    }

})
const updateProductQuantity = catchError(async (req, res, next) => {

    let cart = await Cart.findOne({ user: req.user._id })
    let product = await Product.findById(req.params.id)

    if (!cart) return next(new AppError('cart not found', 404))
    let item = cart.cartItems.find(item => item.product == req.params.id)
    if (!item) return next(new AppError('product not Found', 404))
    item.quantity = req.body.quantity
    if (item.quantity > product.stock) return next(new AppError('sold out', 404))


    await cart.save()
    calcTotalPrice(cart, product.price)
    res.json({ message: "Success", cart })

})
const removeFromCart = catchError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)


    let cart = await Cart.findOneAndUpdate({ user: req.user._id }, {
        $pull: { cartItems: { product: req.params.id } }

    }, { new: true })
    if (!cart) return next(new AppError('cart not found', 404))

    await cart.save()
    res.json({ message: "success", cart })



})
const getUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('cart not found', 404))

    res.json({ message: "success", cart })



})
const clearUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({ user: req.user._id })
    if (!cart) return next(new AppError('cart not found', 404))

    res.json({ message: "success", cart })



})
const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findOne({ code: req.body.code, expires: { $gte: Date.now() } })
    if (!coupon) return next(new AppError('invalid coupon ', 404))
    let cart =await Cart.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('cart not found', 501))
        console.log( cart.totalCartPriceAfterDiscount);

    cart.totalCartPriceAfterDiscount = cart.totalCartPriceNumber - (cart.totalCartPriceNumber * coupon.discount) / 100
   
    cart.discount = coupon.discount
    await cart.save()
    res.json({ message: "success", cart })



})


export {
    addToCart,
    updateProductQuantity,
    removeFromCart,
    getUserCart,
    clearUserCart,
    applyCoupon
}
