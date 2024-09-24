import { model, Schema } from "mongoose";

const schema = new Schema({

    comment: {
        type: String,
        trim: true,
        minLength: 2
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },

    rate: {
        type: Number,
        min: 0,
        max: 5
    }
}, {
    timestamps: true, versionKey: false
},)

const Review = model('Review', schema)
export {
    Review
}