

import express from 'express'
//import { Blogcreate,deletepost,postupdate,GetAllblogs } from '../controllers/Blogcreate.js'
import { register,login,profile,UserUpdate,alluser} from '../controllers/Authantication.js'
import { CandidateHandale,voteHandel,VoteCount,CandidateDelete } from '../controllers/voteHandel.js'
import { isAuthenticated,isAdmin } from '../midelware/isAdmin.js'
import upload from '../midelware/Multer.js'
const router=express.Router()
//vote app router<>
router.post('/register',upload.single("photo"),register)
router.post("/login",login)

router.post("/create",isAuthenticated,isAdmin("admin"),CandidateHandale)
router.post("/voteing/:id",isAuthenticated,voteHandel)
router.get("/votecount",VoteCount)
router.delete("/del/:id",isAuthenticated,isAdmin("admin"),CandidateDelete)


router.put("/edit/:id",isAuthenticated,upload.single("photo"),UserUpdate)
router.get("/profile",isAuthenticated,profile)
router.get("/get",alluser)

//close</>
export default router

// router.post("/create",isAuthenticated,isAdmin("admin"),upload.single('postimage'),Blogcreate)
// router.delete("/delete/:id",deletepost)
// router.put("/update/:id",isAuthenticated,isAdmin("admin"),upload.single('postimage'),postupdate)
// router.get("/allblog",GetAllblogs)











