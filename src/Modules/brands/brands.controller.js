import slugify from "slugify"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import { Brand } from "../../../DB/models/brand.model.js"

const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()
    res.json({ message: "Success", brand })

})
const allBrands = catchError(async (req, res, next) => {
    let Brands = await Brand.find()
    res.json({ message: "Success", Brands })
})
const getBrand = catchError(async (req, res, next) => {
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppError("id is not true"))
    !brand || res.json({ message: "Success", brand })

})
const deleteBrand = catchError(async (req, res, next) => {
    let brand = await Brand.findByIdAndDelete(req.params.id)
    brand || next(new AppError("id is not true"))
    !brand || res.json({ message: "Success", brand })
})
const updateBrand = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.logo = req.file.filename
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
    brand || next(new AppError("id is not true"))
    !brand || res.json({ message: "Success", brand })

})
export {
    addBrand,
    allBrands,
    getBrand,
    deleteBrand,
    updateBrand
}
