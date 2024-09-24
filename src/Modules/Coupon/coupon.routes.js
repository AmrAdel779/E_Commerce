import { Router } from "express";
import { addCoupon, updateCoupon, deleteCoupon, allCoupons, getCoupon } from "./coupon.controller.js";
import { isAllowed, protectedRoute } from "../Auth/Auth.controller.js";

const couponRouter = Router()
couponRouter.use(protectedRoute, isAllowed('Admin'))
couponRouter
    .route("/")
    .post(addCoupon)
    .get(allCoupons)
couponRouter
    .route("/:id")
    .get(getCoupon)
    .put(updateCoupon)
    .delete(deleteCoupon)
export {
    couponRouter
}