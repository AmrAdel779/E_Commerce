import { model, Schema } from "mongoose";

const schema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    cartItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: Number

        }
    ],
    totalCartPriceNumber: Number,
    discount: Number,
    totalCartPriceAfterDiscount: Number


}, {
    timestamps: true, versionKey: false
},)



const Cart = model('Cart', schema)
export {
    Cart
}