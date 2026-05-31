import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateToken} from "../lib/utils.js"

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body
    try {
        // hash password
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }

        if(!email || !fullName || !password){
            return res.status(400).json({message:"Invalid Entries"})
        }

        const user=await User.findOne({email})

        if(user) return res.status(400).json({message:"Email already exists"})

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            fullName,
            email,
            password:hashedPassword,
        })

        if(newUser){
            // Generate Token
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(200).json({
                _id:newUser._id
            })
        }else{
            res.status(400).json({message:"Invalid User Data"})
        }

    } catch (error) {
        console.log("Ye h error",error)
        res.status(400).json(error)
    }
}