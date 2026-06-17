const adminOnly = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(403).json({
            success:false,
            message:"Admin access only"
        });
    }
};

export default adminOnly;