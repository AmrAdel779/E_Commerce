import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import { Coupon } from "../../../DB/models/coupon.model.js"
const addCoupon = catchError(async (req, res, next) => {
    let isExists=Coupon.findOne({code:req.body.code})
    if(isExists)return next(new AppError('coupon already exists'),501)
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.json({ message: "Success", coupon })

})
const allCoupons = catchError(async (req, res, next) => {
    let coupons = await Coupon.find()
    res.json({ message: "Success", coupons })
})
const getCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findById(req.params.id)
    coupon || next(new AppError("id is not true"))
    !coupon || res.json({ message: "Success", coupon })

})
const deleteCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findByIdAndDelete(req.params.id)
    coupon || next(new AppError("id is not true"))
    !coupon || res.json({ message: "Success", coupon })
})
const updateCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
    coupon || next(new AppError("id is not true"))
    !coupon || res.json({ message: "Success", coupon })

})
export {
    addCoupon,
    allCoupons,
    getCoupon,
    deleteCoupon,
    updateCoupon
}
