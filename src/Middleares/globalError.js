const globalError=(err,req,res,next)=>{

    let code=err.statusCode || 500

    res.json({message:"error",code,error:err.message})

}

export{
    globalError
}