import { Router } from "express";
import { addProduct,allProducts,updateProduct,deleteProduct,getProduct } from "./products.controller.js";
import { uploadArray } from "../../../fileUpload/fileUpload.js";
const productRouter = Router()

productRouter
    .route("/")
    .post(uploadArray([{name:"imgCover",maxCount:1},{name:"images",maxCount:10}],"productUpload"),addProduct)
    .get(allProducts)
productRouter
    .route("/:id")
    .get(getProduct)
    .put(uploadArray([{name:"imgCover",maxCount:1},{name:"images",maxCount:10}],"productUpload"),updateProduct)
    .delete(deleteProduct)
export {
    productRouter
}