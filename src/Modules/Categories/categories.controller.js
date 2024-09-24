import slugify from "slugify"
import { Category } from "../../../DB/models/category.model.js"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import { ApiFeatures } from "../../utilites/ApiFeatures.js"
const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.json({ message: "Success", category })

})
const allCategories = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Category.find(), req.query).pagination().filter().selectedFields().search().sort()
    let categories = await apiFeatures.mongooseQuery
    res.json({ message: "Success", page: apiFeatures.pageNumber ,categories })
})
const getCategory = catchError(async (req, res, next) => {
    let category = await Category.findById(req.params.id)
    category || next(new AppError("id is not true"))
    !category || res.json({ message: "Success", category })

})
const deleteCategory = catchError(async (req, res, next) => {
    let category = await Category.findByIdAndDelete(req.params.id)
    category || next(new AppError("id is not true"))
    !category || res.json({ message: "Success", category })
})
const updateCategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    category || next(new AppError("id is not true"))
    !category || res.json({ message: "Success", category })

})
export {
    addCategory,
    allCategories,
    getCategory,
    deleteCategory,
    updateCategory
}
