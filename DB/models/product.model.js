import { model, Schema } from "mongoose";

const schema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        unique: true
    },
    descryption: {
        type: String,
        minLength: 3,
        maxLength: 2000,
        required: true
    },
    imgCover: {
        type: String
    },
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        min: 0
    },
    sold: {
        type: Number,
    },
    stock: {
        type: Number,
        min: 0
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    },
    rateCount: Number

}, {
    timestamps: true, versionKey: false, toJSON: { virtuals: true }
})

schema.post('init', (doc) => {
    if (doc.imgCover) doc.imgCover = process.env.Base_Url + "productUpload/" + doc.imgCover
    if (doc.images) doc.images = doc.images.map(img => process.env.Base_Url + "productUpload/" + img)
})
schema.virtual('myReviews', {
    ref: 'Review',
    localField: "_id",
    foreignField: "product"
})

schema.pre('findOne', function () {
    this.populate("myReviews")
})

const Product = model('Product', schema)
export {
    Product
}