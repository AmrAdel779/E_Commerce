import { Router } from "express";
import { getAllUsers, getUser, updateUser, deleteUser, addUser } from "./user.controller.js";
import { checkEmail } from "../../Middleares/checkEmail.js";
import { orderRouter } from "../Order/Order.routes.js";

export let UserRouter = Router()

UserRouter
    .route("/")
    .get(getAllUsers)
    .post(checkEmail, addUser)
UserRouter.
    use("/:user/order", orderRouter)
UserRouter
    .route("/:id")
    .get(getUser)
    .put(checkEmail, updateUser)
    .delete(deleteUser)
UserRouter
    .route("/signIn")



