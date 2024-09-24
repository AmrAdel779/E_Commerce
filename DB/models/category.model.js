import { model, Schema } from "mongoose";

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 2,
      
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String

},{
    timestamps: true, versionKey: false
})
schema.post('init',(doc)=>{
    doc.image=process.env.Base_Url + "categoryUpload/" + doc.image
})
const Category = model('Category', schema)
export {
    Category
}