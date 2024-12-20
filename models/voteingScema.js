

import mongoose from "mongoose";
import { string } from "zod";
import jwt from 'jsonwebtoken'
import { type } from "os";
const UserScema=new mongoose.Schema({
    name:{         
        type:String,
        required:true,
        },

        party:{
         type:String,
         required:true
        },

  
          votes:[{
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
      },

      voteAt:{     
        type:Date,
        defult:Date.now()
      } ,
       }]
          ,
  
     votecount:{
        type:Number,
        default:0
  
     }
})

export const Voteing=mongoose.model("candidate",UserScema)


















