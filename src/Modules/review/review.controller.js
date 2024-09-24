import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import { ApiFeatures } from "../../utilites/ApiFeatures.js"
import { Review } from "../../../DB/models/review.model.js"

const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let isExists = await Review.findOne({ user: req.user._id, product: req.body.product })
    if (isExists) return next(new AppError('U can review one time', 1))
    let review = new Review(req.body)
    await review.save()
    res.json({ message: "Success", review })

})
const allReviews = catchError(async (req, res, next) => {


    let apiFeatures = new ApiFeatures(Review.find(), req.query).pagination().filter().selectedFields().search().sort()
    let review = await apiFeatures.mongooseQuery
    res.json({ message: "Success", page: apiFeatures.pageNumber, review })


})
const getReview = catchError(async (req, res, next) => {
    let review = await Review.findById(req.params.id)
    review || next(new AppError("id is not true"))
    !review || res.json({ message: "Success", review })

})
const deleteReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    review || next(new AppError("can not delete this review"))
    !review || res.json({ message: "Success", review })
})
const updateReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    review || next(new AppError("u can not update in this review"))
    !review || res.json({ message: "Success", review })

})
export {
    addReview,
    allReviews,
    getReview,
    deleteReview,
    updateReview
}
