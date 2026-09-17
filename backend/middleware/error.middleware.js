const errorHandler = (err,req,res,next) =>{
    console.log("ERROR: ",err);
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    if(err.name == "CastError"){
        statusCode = 400;
        message = "Invalid Note ID";
    }
    if(err.name == "ValidationError"){
        statusCode = 400;
        const errors = Object.values(err.errors).map(
            (error) => error.message
        );
        return res.status(statusCode).json({
            success:false,
            message:"Validation Failed",
            errors
        });
    }
    res.status(statusCode).json({
        success:false,
        message
    })
}

module.exports = errorHandler;