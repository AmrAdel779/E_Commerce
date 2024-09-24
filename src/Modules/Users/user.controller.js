import { User } from "../../../DB/models/user.model.js"
import { catchError } from "../../Middleares/catchError.js"
import { ApiFeatures } from "../../utilites/ApiFeatures.js"
import { AppError } from "../../utilites/AppError.js"

const addUser = catchError(async (req, res, next) => {
    let user = new User(req.body)
    await user.save()
    res.json({ message: "success", user })

})

const getAllUsers = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(User.find(), req.query).pagination().filter().selectedFields().search().sort()
    let users = await apiFeatures.mongooseQuery
    res.json({ message: "Success", page: apiFeatures.pageNumber, users })

})

const getUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (user) return res.json({ message: "success", user })
    next(new AppError("user doesn't exists", 501))
})

const updateUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (user) return res.json({ message: "success", user })
    next(new AppError('invalid User', 501))
})

const deleteUser = catchError(async (req, res, next) => {

    let user = await User.findByIdAndDelete(req.params.id)
    if (user) return res.json({ message: "success", user })
    next(new AppError('invalid user', 501))
})

export {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}