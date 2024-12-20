

import { Voteing } from "../models/voteingScema.js";
import { User } from "../models/UserScema.js";


export const CandidateHandale=async(req,res)=>{
    try {
        
//const userId=req.user.id
const data=req.body
const showdata=new Voteing(data)
const response=await showdata.save()
return res.status(200).json({msg:response})
    } 
catch (error) {
        console.log(error)
    }}


//--delete Candidate//--

export const CandidateDelete=async(req,res)=>{
try {
    const candidateId=req.params.id
    const candidateData=await Voteing.findById(candidateId)
    if(!candidateData){
        return res.status(400).json({msg:"invalid"})
    }
   const deleteData=await candidateData.deleteOne()
  return res.status(200).json({msg:"delete done",deleteData})
} catch (error) {
    console.log(error)
}


}

//--
//Voteing -//

export const voteHandel=async(req,res)=>{

    const userId=req.user.id //--Jwt verifay UserId
    const candidateId=req.params.id //--Database Store CandidateID
try {
   const candidateCoise=await Voteing.findById(candidateId) //voter Coise Candidate
   if(!candidateCoise){
    return res.status(404).json({msg:"candidate not found"})
   }
    const voterId=await User.findById(userId)
     if(!voterId){
        return res.status(400).json({msg:"user not found"})
     }
     if(voterId.isVoted){
        return res.status(200).json({msg:"You Alredy Voted"})
     }

     if(voterId.role=='admin'){//admin cheak
        return res.status(400).json({msg:"admin is not allowed"})
     }
     


  // Update the Candidate document to record the vote
    candidateCoise.votes.push({userId:userId})
      candidateCoise.votecount++
      await candidateCoise.save()
      voterId.isVoted=true
       await voterId.save()
       return res.status(200).json({msg:"Vote Done"})

} catch (error) {
    console.log(error)
}}



//--
//Vote Counting--//
//--

export const VoteCount=async (req,res)=>{
try {
const counting=await Voteing.find().sort({ticketcount:"desc"})
//maping
 const record=counting.map((data)=>{
 return {
    name:data.name,
    count:data.votecount
 }
 })
 return res.status(200).json({msg:record})
} catch (error) {
    console.log(error)
}
}







