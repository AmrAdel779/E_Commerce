import { User } from "../../../DB/models/user.model.js"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import bcrypt, { compareSync } from "bcrypt"
import jwt from "jsonwebtoken"

const signIn = catchError(async (req, res, next) => {

    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.secretKey)
        res.json({ message: "success", user, token })
    }


    else {
        next(new AppError('incorrect email or password', 501))
    }

})
const signUp = catchError(async (req, res, next) => {
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({ userId: user.id, role: user.role }, process.env.secretKey)
    res.json({ message: "success", user, token })

})

const changePassword = catchError(async (req, res, next) => {

    const isExists = await User.findOne({ email: req.body.email })
    if (isExists && compareSync(req.body.oldPassword, isExists.password)) {
        let user = await User.findOneAndUpdate({ email: req.body.email }, { password: bcrypt.hashSync(req.body.newPassword, 8), passwordCreatedAt: new Date() }, { new: true })
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.secretKey)
        res.json({ message: "success", user, token })
    }
    else {
        next(new AppError('invalid email or password', 409))
    }

})

const protectedRoute = catchError(async (req, res, next) => {

    let { token } = req.headers
    if (!token) return next(new AppError('token must be provided', 401))
    jwt.verify(token, process.env.secretKey, async (err, payload) => {
        if (err) return next(new AppError(err, 401))
        let user = await User.findById(payload.userId)
        if (!user) return next(new AppError('user not found', 401))

        let time = parseInt(user.passwordCreatedAt?.getTime() / 1000)
        if (time > payload.iat) return next(new AppError('invalid token ....login again',409))
        req.user = user
        next()

    })
})

const isAllowed = (...roles) => {
    return catchError(async (req, res, next) => {

        if (roles.includes(req.user.role)) {
            next()
        } else {
            next(new AppError('unanuthorized', 409))
        }


    })

}
// https://vercel.com/amrs-projects-c7b5d69a/e-commerce
export {
    signIn,
    signUp,
    changePassword,
    protectedRoute,
    isAllowed
}