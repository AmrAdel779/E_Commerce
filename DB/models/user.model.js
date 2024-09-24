import { model, Schema, Types } from "mongoose";
import bcrypt from 'bcrypt'

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: [true, 'name Already exists'],
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    confirmEmail: Boolean,
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    passwordCreatedAt: {
        type: Date
    },
    wishList: [{
        type: Types.ObjectId, ref: "Product"
    }],
    addresses: [{
        city: String,
        phone: String,
        street: String
    }]
}, {
    timestamps: true, versionKey: false
},)


schema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})
schema.pre('findOneAndUpdate', function () {

    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})

const User = model('User', schema)
export {
    User
}