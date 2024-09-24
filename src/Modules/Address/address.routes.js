import { Router } from "express";
import { addAddress, getAddress, removeAddress } from "./address.controller.js";
import { isAllowed, protectedRoute } from "../Auth/Auth.controller.js";
const addressRouter = Router()

addressRouter
    .route("/")
    .patch(protectedRoute, isAllowed('User'), addAddress)
    .get(protectedRoute, isAllowed('User'), getAddress)
    addressRouter.
    route("/removeAddress/:id")
    .delete(protectedRoute, isAllowed('User', 'Admin'), removeAddress)
export {
    addressRouter
}