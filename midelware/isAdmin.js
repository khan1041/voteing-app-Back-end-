

// import jwt from 'jsonwebtoken'

// import { User } from '../Models/userscema.js'
// const isAdmin=async(req,res,next)=>{

// try {
//     const token=req.cookies.token
//    if(!token){
//     return res.status(401).json({msg:"Unauthorized:Naver token provided"})
//    }

// const decoded=jwt.verify(token,process.env.JWT_SECRECT_KEY)
// const user=await User.findById(decoded.userId)

// if(!user){
//     return res.status(403).json({msg:"Unauthorized:user is a not admin"
//     })
// }


// if(user.role!='admin'){

//   return res.status(403).json({msg:"Unauthorized:user not found"})

// }
// req.user=user

// next()
// } catch (error) {
//     console.log(error)
// }

// }




// //islo

// const isLogin=async(req,res,next)=>{

// try {
//     const token=req.cookies.token
//     if(!token){
//      return res.status(401).json({msg:"Unauthorized:No token provided"})
//     }
 
//  const decoded=jwt.verify(token,process.env.JWT_SECRECT_KEY)
//  const user=await User.findById(decoded.userId)
 
//  if(!user){
//      return res.status(403).json({msg:"Unauthorized:user is a not admin"
//      })
//  }
 
//    req.user=user

//  next() 
// } catch (error) {
    
// }

// }



// export {isAdmin,isLogin}





import { User } from "../models/UserScema.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
//Authentication
export const isAuthenticated = async (req, res, next) => {


  const token=req.header("Authorization")

  if(!token){
    return res.status(401).json({msg:"not massage"})
  }
  
 console.log("token",token)
   
const jwttoken=token.replace("Bearer","").trim()
console.log(jwttoken)
  

try {
  const isVerified=jwt.verify(jwttoken,process.env.JWT_SECRECT_KEY)
 
   console.log(isVerified)

const userdata=await User.findOne({nid:isVerified.nid}).select({password:0})

console.log(userdata)

req.user=userdata,
req.token=token,
req.userId=userdata._id

  next()
} catch (error) {
  console.log(error)
}


}


//Authorization
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `User with given role ${req.user.role} not allowed` });
    }
    next();
  };
}
