import { connect } from "mongoose";

export const connection=connect(`mongodb+srv://AmrAdel:9pZ6R24dxpMJtTjk@cluster0.quyb6.mongodb.net/`).then(()=>{
    console.log("Database connected");
    
}).catch(()=>{
    console.log("database error");
    
})


