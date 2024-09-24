import { AppError } from "../utilites/AppError.js"

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate({image:req.file, ...req.body, ...req.params, ...req.query })
        if (error) {
            let errMsg = []
            error.details.map(err => errMsg.push(err.message))
            next(new AppError(errMsg, 501))
        }
        else {
            next()
        }
    }
}