
import { User } from "../../../DB/models/user.model.js"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"

const addAddress = catchError(async (req, res, next) => {


    let adress = await User.findByIdAndUpdate(req.user._id, { $addToSet: { addresses: req.body } }, { new: true })
    if (adress) {
        res.json({ message: "Success", adress: adress.addresses })

    } else {
        next(new AppError('wrongId', 501))
    }
})
const removeAddress = catchError(async (req, res, next) => {


    let address = await User.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true })
    if (address) {
        res.json({ message: "Success", address: address.addresses })

    } else {
        next(new AppError('wrongId', 501))
    }
})
const getAddress = catchError(async (req, res, next) => {


    let address = await User.findById(req.user._id).populate('addresses')
    if (address) {
        res.json({ message: "Success", address: address.addresses })

    } else {
        next(new AppError('wrongId', 501))
    }
})


export {
    addAddress,
    getAddress,
    removeAddress
}
