

import { User } from "../models/UserScema.js"
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
//import { User } from "../models/VoterScema.js";
import multer from "multer";
export const register=async(req,res)=>{

    try {
            //const {filename}=req.file'
  const uplod=await cloudinary.uploader.upload(req.file.path)
  console.log(uplod)
       const {name,nid,password,role}=req.body

       const exituser=await User.findOne({nid})
      
       if(exituser){
           return res.status(400).json({msg:"email exits please login"})
       }
   
    // const {filename}=req.file
      const admin=await User.findOne({role:"admin"})
      if(role==='admin' && admin){
       return res.status(400).json({msg:"admin already exits"})
      }
 

   const create=new User({
      name,nid, password:await bcrypt.hash(password,10),photo:uplod.url,role
   })
   console.log(create)
   await create.save()
  return res.status(201).json({msg:create, token:await create.generateToken(),
   userId:create._id.toString()})   
 
    } catch (error) {
    console.log("error",error)
          
    } 

}


///----
//login
//----///


export const login=async(req,res)=>{

    try {
        const {Nidcard,password}=req.body

        const nidcardchek=await User.findOne({Nidcard})
        
        if(!nidcardchek){
            return res.status(400).json({msg:"user email failed"})
        }


       const isMatch=await bcrypt.compare(password,nidcardchek.password)

        
    //     const isMatch=await bcrypt.compare(password,useremail.password)
   
        if(!isMatch){
            return res.status(400).json({msg:"login failed"})
        }
        else{

            return res.status(200).json({msg:"done login",

      token:await nidcardchek.generateToken(),
      userId:nidcardchek._id

            })
        }


    } catch (error) {
        console.log(error)
    }
}


//Logout//
//--frontend part (react) useeffect

//--Profile
//--
export const profile=async(req,res)=>{

try {
    const user=req.user
    console.log(user)
    res.status(200).json({user})
} catch (error) {
    console.log(error)
}


}


//--
//User profile Update
//--

export const UserUpdate=async(req,res)=>{

try {
    const{name,password,photo}=req.body
    const userId=req.params.id
    const uplod=await cloudinary.uploader.upload(req.file.path)
    const update=await User.findById(userId)
    
    if(!update){
        return res.status(404).json({msg:"user id not found"}) 
    }
 
    if(name){
        update.name=name
    }
    
    if(password){
        update.password=await bcrypt.hash(password,10)
    }


        update.photo=uplod.url   
    
    await update.save()
    return res.status(200).json({msg:"post update",update})
    //return res.status(200).json({msg:"user update"})
} catch (error) {
    console.log(error)
}}


//Get all User

export const alluser=async(req,res)=>{

try {
    const alldatafind=await User.find()
    
    return res.status(200).json({msg:alldatafind})
} catch (error) {
    console.log(error)
}

}
























