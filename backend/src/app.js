import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'
export const app = express();

import User from '../models/userModel.js';

app.use(cors(
    {
        origin:'*'
    }
));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Hello I am Server");
})

//register for the user
app.post("/register",async(req,res)=>{
    // console.log(req.body); 

    const{firstName,lastName,email,password,userType} = req.body;
    console.log("firstName : ",firstName,"lastName : ",lastName,"email : ",email,"password : ",password,"userType: ",userType);

    if(!firstName || !lastName || !email || !password || !userType){
        //console.log("in empty field");
        return res.status(433).json({error:"please fill all the fields"});
    }
    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            //console.log("in user alredy exist");
            res.status(422).json({error:"User Already Exist!"});
            return;
        }else{
            //console.log("in creating user");
            const user =  new User({
                firstName,
                lastName,
                email,
                password,
                userType
            });
            const userRegister = await user.save();
            if(userRegister){
                //console.log("user created");
               return res.status(201).json({user:userRegister})
            }
        }
    }catch(error){
        console.log("in catch");
        console.log(error);
    }
})
