import { Router } from "express";
import { addsubCategory,getsubCategory,allsubCategories,deletesubCategory,updatesubCategory } from "./subCategory.controller.js";
import { checkCategory } from "../../Middleares/checkCategory.js";
const subCategoryRouter = Router({mergeParams:true})

subCategoryRouter
    .route("/")
    .post(checkCategory,addsubCategory)
    .get(allsubCategories)
subCategoryRouter
    .route("/:id")
    .get(getsubCategory)
    .put(checkCategory,updatesubCategory)
    .delete(deletesubCategory)
export {
    subCategoryRouter
}