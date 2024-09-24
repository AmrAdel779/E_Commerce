import { Router } from "express";
import { addBrand,allBrands,getBrand,updateBrand,deleteBrand } from "./brands.controller.js";
import { uploadSingle } from "../../../fileUpload/fileUpload.js";
const brandRouter = Router()

brandRouter
    .route("/")
    .post(uploadSingle("logo","brandUpload"),addBrand)
    .get(allBrands)
brandRouter
    .route("/:id")
    .get(getBrand)
    .put(uploadSingle("logo","brandUpload"),updateBrand)
    .delete(deleteBrand)
export {
    brandRouter
}