
import { User } from "../../../DB/models/user.model.js"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"

const addToWishList = catchError(async (req, res, next) => {


    let wishlist = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: req.body.product } }, { new: true })
    if (wishlist) {
        res.json({ message: "Success", wishlist: wishlist.wishList })

    } else {
        next(new AppError('wrongId', 501))
    }
})
const removeFromWishList = catchError(async (req, res, next) => {


    let wishlist = await User.findByIdAndUpdate(req.user._id, { $pull: { wishList: req.body.product } }, { new: true })
    if (wishlist) {
        res.json({ message: "Success", wishlist: wishlist.wishList })

    } else {
        next(new AppError('wrongId', 501))
    }
})
const getWishList = catchError(async (req, res, next) => {


    let wishlist = await User.findById(req.user._id).populate('wishList')
    if (wishlist) {
        res.json({ message: "Success", wishlist: wishlist.wishList })

    } else {
        next(new AppError('wrongId', 501))
    }
})


export {
    addToWishList,
    getWishList,
    removeFromWishList
}
