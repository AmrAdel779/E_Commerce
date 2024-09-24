import { model, Schema } from "mongoose";

const schema = new Schema({

    code: {
        type: String,
        unique:true
    },
    discount: {
        type: Number,
    },
    expires: {
        type: Date,
    },

}, {
    timestamps: true, versionKey: false
},)

const Coupon = model('Coupon', schema)
export {
    Coupon
}