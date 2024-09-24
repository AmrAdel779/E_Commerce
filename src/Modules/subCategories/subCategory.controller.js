import slugify from "slugify"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import { SubCategory } from "../../../DB/models/subCategory.model.js"
import { ApiFeatures } from "../../utilites/ApiFeatures.js"

const addsubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory = new SubCategory(req.body)
    await subcategory.save()
    res.json({ message: "Success", subcategory })

})
const allsubCategories = catchError(async (req, res, next) => {
    if(req.params.category){
        let subCategories = await SubCategory.find({category:req.params.category})
        res.json({ message: "Success", subCategories })
    }
    else{
        let apiFeatures = new ApiFeatures(SubCategory.find(), req.query).pagination().filter().selectedFields().search().sort()
        let subCategories = await apiFeatures.mongooseQuery
        res.json({ message: "Success", page: apiFeatures.pageNumber,subCategories,  })
    }
  
})
const getsubCategory = catchError(async (req, res, next) => {
    let subcategory = await SubCategory.findById(req.params.id)
    subcategory || next(new AppError("id is not true"))
    !subcategory || res.json({ message: "Success", subcategory })

})
const deletesubCategory = catchError(async (req, res, next) => {
    let subcategory = await SubCategory.findByIdAndDelete(req.params.id)
    subcategory || next(new AppError("id is not true"))
    !subcategory || res.json({ message: "Success", subcategory })
})
const updatesubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    subcategory || next(new AppError("id is not true"))
    !subcategory || res.json({ message: "Success", subcategory })

})
export {
    addsubCategory,
    allsubCategories,
    getsubCategory,
    deletesubCategory,
    updatesubCategory
}
