import multer from "multer"
import { AppError } from "../src/utilites/AppError.js"
import {v4 as uuidv4} from "uuid"
const fileUpload = (folderName) => {


    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folderName}`)
        },
        filename: (req, file, cb) => {

            cb(null, uuidv4() + file.originalname)
        }
    })
    const fileFilter = (req, file, cb) => {
        console.log(file);

        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new AppError('error incorrect image', 501)
                , false)

        }


    }

    const upload = multer({ storage, fileFilter })
    return upload
}

const uploadSingle = (fieldName, folderName) =>fileUpload(folderName).single(fieldName)
const uploadArray = (arrayFieldName, folderName) => fileUpload(folderName).fields(arrayFieldName)


export {
    fileUpload,
    uploadSingle,
    uploadArray
}