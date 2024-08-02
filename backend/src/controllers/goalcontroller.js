const Goal=require("../models/goalModel")
const User=require("../models/userModel")


const getGoal= async (req,res)=>{
    const goals= await Goal.find({user:req.user._id}) //token  id
    res.status(200).json(goals)
}

const setGoal= async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("please add a text ")
    }
    const goal= await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal)
}
const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            res.status(400).json({ message: "Goal not found" });
            return;
        }


        // middleawre id
        const user= await User.findById(req.user.id)
        if(!user){
            return res.status(401).json({msg:"user not found"})
        }

        if(goal.user.toString() !==user.id){
            return res.status(401).json({msg:"user not authorized"})
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );

        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            res.status(400).json({ message: "Goal not found" });
            return;
        }

        await Goal.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Goal deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports={
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}