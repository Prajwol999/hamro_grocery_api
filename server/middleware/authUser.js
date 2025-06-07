
const authUser = async (req,res)=>{

    const {token} = req.cookies;
    if(!token){
        return res.json({success:false,message:"Not authorized"});
    }
    
    try{
        const tokenDecode = jwt.verify(token,process.env.SECRET)
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({success:false,message:error.message});
        }
        next();
    }catch(error){
        res.json({success:false,message:error.message});

    }
}
export default authUser
   
