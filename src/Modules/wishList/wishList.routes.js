import { Router } from "express";
import { addToWishList, getWishList, removeFromWishList } from "./wishList.controller.js";
import { isAllowed, protectedRoute } from "../Auth/Auth.controller.js";
const wishListRouter = Router()

wishListRouter
    .route("/")
    .patch(protectedRoute, isAllowed('User'), addToWishList)
    .get(protectedRoute, isAllowed('User'),getWishList)
wishListRouter.
    route("/removeFromWishList")
    .patch(protectedRoute, isAllowed('User','Admin'),removeFromWishList)
export {
    wishListRouter
}