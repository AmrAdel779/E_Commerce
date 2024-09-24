import slugify from "slugify"
import { catchError } from "../../Middleares/catchError.js"
import { AppError } from "../../utilites/AppError.js"
import { Product } from "../../../DB/models/product.model.js"
import { ApiFeatures } from "../../utilites/ApiFeatures.js"

const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)

    let product = new Product(req.body)
    await product.save()
    res.json({ message: "Success", product })

})
const allProducts = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Product.find(), req.query).pagination().filter().selectedFields().search().sort()
    let products = await apiFeatures.mongooseQuery
    res.json({ message: "Success", page: apiFeatures.pageNumber, products })
})
const getProduct = catchError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    product || next(new AppError("id is not true"))
    !product || res.json({ message: "Success", product })

})
const deleteProduct = catchError(async (req, res, next) => {
    let product = await Category.findByIdAndDelete(req.params.id)
    product || next(new AppError("id is not true"))
    !product || res.json({ message: "Success", product })
})
const updateProduct = catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title)

    if (req.files.imgCover) {
        req.body.imgCover = req.files.imgCover[0].filename
    }
    if (req.files.images) {
        req.body.images = req.files.images.map(img => img.filename)
    }


    let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    product || next(new AppError("id is not true"))
    !product || res.json({ message: "Success", product })

})
export {
    addProduct,
    allProducts,
    getProduct,
    deleteProduct,
    updateProduct
}
