import { Router } from "express";
import { changePassword, signIn, signUp } from "./Auth.controller.js";
import { checkEmail } from "../../Middleares/checkEmail.js";

export let authRouter = Router()

authRouter
    .route("/signUp")
    .post(checkEmail, signUp)

authRouter
    .route("/signIn")
    .post(signIn)

authRouter
    .route("/changePassword")
    .patch(changePassword)
