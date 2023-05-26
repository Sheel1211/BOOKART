import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const Authenticate = async  (req,res,next)=>{
    try{
        console.log("in authenticate : ",req.body);
        const token = req.cookies.jwtoken;
        if(token == null){
            console.log("in token null")
            return res.status(400).send({message:"User is Not Login"});
        }else{
            console.log("in user login else")
            const verfyToken = jwt.verify(token,"BOOKARTBOOKARTBOOKARTBOOKARTBOOKARTBOOKARTBOOKARTBOOKART");
            const rootUser = await User.findOne({_id:verfyToken._id});
            if(!rootUser){
                return res.status(400).send({message:"User Not Found"});
            }
            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;
            next();
        }

    }catch(error){
        return res.status(401).send("Unauthorized Access!");
    }
};
export default Authenticate;