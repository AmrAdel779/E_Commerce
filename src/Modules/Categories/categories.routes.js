import { Router } from "express";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./categories.controller.js";
import { uploadSingle } from "../../../fileUpload/fileUpload.js";
import { validate } from "../../Middleares/validate.js";
import { categorySchema } from "./categoryValidate.js";
import { subCategoryRouter } from "../subCategories/subCategory.routes.js";
import { isAllowed, protectedRoute } from "../Auth/Auth.controller.js";

const categoryRouter = Router()

categoryRouter.
    use("/:category/subCategory", subCategoryRouter)
categoryRouter
    .route("/")
    .post(protectedRoute,isAllowed('Admin'),uploadSingle('image', 'categoryUpload'), validate(categorySchema),addCategory)
    .get(allCategories)
categoryRouter
    .route("/:id")
    .get(getCategory)
    .put(protectedRoute,isAllowed('Admin'),uploadSingle('image', 'categoryUpload'), updateCategory)
    .delete(protectedRoute,isAllowed('Admin'),deleteCategory)
export {
    categoryRouter
}
