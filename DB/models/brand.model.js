import { model, Schema } from "mongoose";

const schema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: String
}, {
    timestamps: true, versionKey: false
},)

schema.post('init', (doc) => {
    doc.image = process.env.Base_Url + "brandUpload/" + doc.image
})

const Brand = model('Brand', schema)
export {
    Brand
}