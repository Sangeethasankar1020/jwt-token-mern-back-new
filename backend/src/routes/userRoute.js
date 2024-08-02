const express=require("express")
const router=express.Router()
const {registerUser,loginUser,getMe}=require("../controllers/userController")

// middleware

const {auth}=require("../middleware/authMiddleware")

router.post("/",registerUser)
router.post("/login",loginUser)
router.get("/me",auth,getMe)

module.exports=router