import jwt from 'jsonwebtoken'

const authSeller = async (req,res)=>{

    const{sellerToken} = req.cookies
    if(!sellerToken){
        return res.json({success:false,message:"Not Authorized"});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.SECRET);
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
          
          next();
        } else {
          return res.status(401).json({ success: false, message: "Invalid token" });
        }
      } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
      }

}
export default authSeller