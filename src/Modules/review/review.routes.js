import { Router } from "express";
import { addReview, allReviews, deleteReview, updateReview, getReview } from "./review.controller.js";
import { isAllowed, protectedRoute } from "../Auth/Auth.controller.js";
const reviewRouter = Router()

reviewRouter
    .route("/")
    .post(protectedRoute, isAllowed('User'), addReview)
    .get(allReviews)
reviewRouter
    .route("/:id")
    .get(getReview)
    .put(protectedRoute, isAllowed('User'), updateReview)
    .delete(protectedRoute, isAllowed('User', 'Admin'), deleteReview)
export {
    reviewRouter
}