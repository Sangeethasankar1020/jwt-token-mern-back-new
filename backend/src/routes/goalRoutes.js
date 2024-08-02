const express=require("express")
const router=express.Router()
const {getGoal,setGoal,updateGoal,deleteGoal}=require("../controllers/goalcontroller")
const {auth}=require("../middleware/authMiddleware")




router.route("/").get(auth,getGoal).post(auth,setGoal)
router.route("/:id").delete(auth,deleteGoal).put(auth,updateGoal)


module.exports=router