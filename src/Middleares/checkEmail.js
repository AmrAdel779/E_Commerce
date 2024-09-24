import { User } from "../../DB/models/user.model.js"
import { AppError } from "../utilites/AppError.js"

export const checkEmail = async(req, res, next) => {
    let user =await User.findOne({ email: req.body.email })
    if (user) {
        next(new AppError("Email already exists", 501))
      
    }else{
        next()    }
 
}