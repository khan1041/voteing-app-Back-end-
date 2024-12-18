

import mongoose from "mongoose";
import { string } from "zod";
import jwt from 'jsonwebtoken'
import { type } from "os";
const UserScema=new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  nid: {
    type: String,
    required: true,
    unique: true,

  },


  role: {
    type: String,
    enum: ["user", "admin"],
   default:"user"
  },


  password: {
    type: String,
    required: true,
  },


  photo: {
    type: String,
    required: true,
  },

  isVoted: {
    type: Boolean,
    default: false
},
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

UserScema.methods.generateToken=function(){

    try {
     return jwt.sign({
   
      userId:this._id.toString(),
    //  email:this.email,
     // isAdmin:this.isAdmin
       nid:this.nid
     },
     
   process.env.JWT_SECRECT_KEY,
   {
     expiresIn:"30d"
   }
   
   )
    } catch (error) {
     console.log(error)
    }
   
   }

export const User=mongoose.model("User",UserScema)

















