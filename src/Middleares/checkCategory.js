import { Category } from "../../DB/models/category.model.js"
import { AppError } from "../utilites/AppError.js"

const checkCategory=async(req,res,next)=>{
let category=await Category.findById(req.body.category)
category || next(new AppError('wrong category details',501))
!category || next()
}
export{
    checkCategory
}