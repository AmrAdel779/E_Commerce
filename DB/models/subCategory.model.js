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
    logo: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true, versionKey: false
})

const SubCategory = model('SubCategory', schema)
export {
    SubCategory
}