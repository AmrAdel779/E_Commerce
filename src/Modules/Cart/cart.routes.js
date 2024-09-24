import { Router } from "express";
import { isAllowed, protectedRoute } from "../Auth/Auth.controller.js";
import { addToCart, applyCoupon, clearUserCart, getUserCart, removeFromCart, updateProductQuantity } from "./cart.controller.js";

const cartRouter = Router()
cartRouter
    .route("/")
    .post(protectedRoute, isAllowed('User'), addToCart)
    .get(protectedRoute, isAllowed('User'), getUserCart)
    .delete(protectedRoute, isAllowed('User'), clearUserCart)
cartRouter
    .route("/:id")
    .put(protectedRoute, isAllowed('User'), updateProductQuantity)
    .delete(protectedRoute, isAllowed('User'), removeFromCart)
cartRouter
    .route("/applyCoupon")
    .post(protectedRoute,isAllowed('User'), applyCoupon)

export {
    cartRouter
}