import { AppError } from "../utilites/AppError.js"

function catchError(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(new AppError(err, 501))
        })
    }
}
export { catchError }