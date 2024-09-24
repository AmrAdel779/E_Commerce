import { Router } from "express";
import { isAllowed, protectedRoute } from "../Auth/Auth.controller.js";
import { createCashOrder, createCheckOutSession, getAllOrders } from "./Order.controller.js";

const orderRouter = Router({ mergeParams: true })
orderRouter
    .route("/")
    .get(protectedRoute,isAllowed('User','Admin'),getAllOrders)
orderRouter
    .route("/checkOut/:id")
    .post(protectedRoute,isAllowed('User'),createCheckOutSession)

orderRouter
    .route("/:id")
    .post(protectedRoute, isAllowed('User'), createCashOrder)
export {
    orderRouter
}